import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { RestaurantsService } from 'src/app/pages/restaurants/restaurants.service';
import { FoodOrderInterface, FoodOrderStatusEnum, OrderTypeEnum } from 'src/app/pages/tabs/orders/orders.interface';
import { OrdersService } from 'src/app/pages/tabs/orders/orders.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InitializeService } from 'src/app/services/initialize/initialize.service';
import { RazorPayService } from 'src/app/services/payment/razor-pay/razor-pay.service';
import { CartParams } from './cart-details/cart-details.component';
import { CartSelectAddressComponent, EmittingAddress } from './cart-select-address/cart-select-address.component';
import { RestaurantCartService } from './restaurant-cart.service';

@Component({
  selector: 'app-restaurant-cart',
  templateUrl: './restaurant-cart.component.html',
  styleUrls: ['./restaurant-cart.component.scss'],
})
export class RestaurantCartComponent implements OnInit, AfterViewInit {

  scrollTop: number;
  slideOptions = {}
  @ViewChild(IonSlides) ionSlides: IonSlides
  @ViewChild(CartSelectAddressComponent) cartSelectAddressComponent: CartSelectAddressComponent

  currentAddress: EmittingAddress = {
    details: null,
    coordinates: {
      lat: null,
      long: null
    },
    distanceInKm: null,
    distanceText: null,
    landmark: null
  }
  slideIndex = 0
  cartParams: CartParams
  drawMap = false

  constructor(private router: Router, private orderService: OrdersService, private authService: AuthService, private restaurantCartService: RestaurantCartService, public initializeService: InitializeService, private razorpayService: RazorPayService, private zone: NgZone, private modalController: ModalController, public restaurantService: RestaurantsService) { }

  ngOnInit() {
    if (this.authService.user.savedAddresses && this.authService.user.savedAddresses.length) {
      let address = this.authService.user.savedAddresses[0]
      this.currentAddress.coordinates = address.coordinates
      this.currentAddress.details = address.details
      this.currentAddress.landmark = address.landMark
      this.currentAddress.distanceInKm = address.distanceInKm
      this.currentAddress.distanceText = address.distanceText
      this.slideIndex = 1
      this.slideOptions = Object.assign(this.slideOptions, { initialSlide: 1 })
    } else {
      this.drawMap = true
    }
  }

  ngAfterViewInit() {
    this.ionSlides.lockSwipes(true)
    this.ionSlides.ionSlideDidChange.subscribe(d => {
      this.ionSlides.getActiveIndex().then(i => this.slideIndex = i)
      this.ionSlides.lockSwipes(true)
    })
  }

  closeCheckout() {
    this.modalController.dismiss()
  }

  contentScrolling(ev) {
    this.scrollTop = ev.detail.scrollTop
  }

  selectAddress(ev: EmittingAddress) {
    // console.log(ev)
    if (!this.slideIndex) {
      this.zone.run(() => this.currentAddress = ev)
    }
  }

  proceedToPaymentPage() {
    if (this.currentAddress.landmark) {
      this.ionSlides.lockSwipes(false)
      this.ionSlides.slideNext()
      this.currentAddress.coordinates = this.cartSelectAddressComponent.address.coordinates
      this.currentAddress.details = this.cartSelectAddressComponent.address.details
      this.currentAddress.distanceInKm = this.cartSelectAddressComponent.address.distanceInKm
      this.currentAddress.landmark = this.cartSelectAddressComponent.address.landmark
      this.currentAddress.distanceText = this.cartSelectAddressComponent.address.distanceText

      this.authService.updateUser({
        _id: this.authService.user._id,
        savedAddresses: [
          {
            coordinates: this.currentAddress.coordinates,
            details: this.currentAddress.details,
            landMark: this.currentAddress.landmark,
            distanceInKm: this.currentAddress.distanceInKm,
            distanceText: this.currentAddress.distanceText
          }
        ]
      }).subscribe(() => {
        this.authService.getUserById(this.authService.user._id)
      })
    }
  }

  changeAddress() {
    this.ionSlides.lockSwipes(false)
    this.ionSlides.slidePrev()
  }

  setCartParams(cartParams: CartParams) {
    this.cartParams = cartParams
  }

  payAndConfirm() {
    let orderObj: FoodOrderInterface = {
      orderStatus: FoodOrderStatusEnum.processing,
      orderType: OrderTypeEnum.food,
      amount: this.cartParams.amount,
      discount: 0,
      cartTotal: this.cartParams.cartAmount,
      deliveryCharge: this.cartParams.deliveryCharge,
      orderDetail: this.cartParams.orderDetail,
      orderedAt: Date.now(),
      orderedBy: {
        coordinates: this.currentAddress.coordinates,
        address: this.currentAddress.details,
        name: this.authService.user.name,
        email: this.authService.user.email,
        phone: this.authService.user.phone,
        landmark: this.currentAddress.landmark,
        distanceInKm: this.currentAddress.distanceInKm,
        pushToken: this.authService.user.pushToken
      },
      tax: 0,
      profitMargin: {
        product: this.getProductMargin(),
        deliveryCharge: (this.cartParams.deliveryCharge / this.initializeService.initializeParams.restaurant.delivery.costPerKm) * this.initializeService.initializeParams.restaurant.delivery.deliveryAgentFeePerKm,
        total: this.getProductMargin() + (this.cartParams.deliveryCharge / this.initializeService.initializeParams.restaurant.delivery.costPerKm) * this.initializeService.initializeParams.restaurant.delivery.deliveryAgentFeePerKm
      }
    }
    // console.log(orderObj)
    this.restaurantCartService.createOrder(orderObj).subscribe(d => {
      //console.log(d)
      this.proceedToRazorPay(d)
    }, err => {
      console.error(err)
    })
  }

  proceedToRazorPay(d) {
    this.razorpayService.proceedPaymentWithRazorpay({
      description: `Paying for dishes ordered from ${this.restaurantService.orderDetail.restaurant.name}`,
      amount: d.payment.amount,
      order_id: d.payment.data.id,
      prefill: {
        email: d.orderedBy.email,
        name: d.orderedBy.name
      }
    }).then(res => {
      //console.log(res)
      res._id = d._id
      //alert("SUccessfully paid " + JSON.stringify(res))
      this.razorpayService.veryfyPayment(res).subscribe(() => {
        this.restaurantService.resetCart()
        this.modalController.dismiss()
        this.router.navigate(['/order-detail'], { queryParams: { _id: d._id, 'order-success': true }, replaceUrl: true })
      }, err => {
        this.orderService.deleteOrder(d._id).subscribe(() => { })
        alert(err.error.message)
      })
    }).catch(err => {
      console.log(err)
      this.orderService.deleteOrder(d._id).subscribe(() => { })
      alert("Payment failed")
    })
  }

  getProductMargin() {
    let n = 0
    this.cartParams.orderDetail.cuisines.forEach(c => {
      n += (c.price - c.cost) * c.items
    })
    return n
  }

}