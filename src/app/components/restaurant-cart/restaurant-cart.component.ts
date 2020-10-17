import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { RestaurantsService } from 'src/app/pages/restaurants/restaurants.service';
import { InitializeService } from 'src/app/services/initialize/initialize.service';
import { RazorPayService } from 'src/app/services/payment/razor-pay/razor-pay.service';
import { EmittingAddress } from './cart-select-address/cart-select-address.component';

@Component({
  selector: 'app-restaurant-cart',
  templateUrl: './restaurant-cart.component.html',
  styleUrls: ['./restaurant-cart.component.scss'],
})
export class RestaurantCartComponent implements OnInit, AfterViewInit {

  scrollTop: number;
  slideOptions = {}
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides

  currentAddress: EmittingAddress = {
    details: null,
    coordinates: {
      lat: null,
      long: null
    },
    distanceInKm: null,
    text: null
  }
  slideIndex = 0
  cartAmount: number

  constructor(public initializeService: InitializeService, private razorpayService: RazorPayService, private zone: NgZone, private modalController: ModalController, public restaurantService: RestaurantsService) { }

  ngOnInit() { }

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
    this.zone.run(() => this.currentAddress = ev)
  }

  payAndOrder() {
    this.ionSlides.lockSwipes(false)
    this.ionSlides.slideNext()
  }

  changeAddress() {
    this.ionSlides.lockSwipes(false)
    this.ionSlides.slidePrev()
  }

  setCartAmount(n) {
    this.cartAmount = n
  }

  payAndConfirm() {
    this.razorpayService.proceedPaymentWithRazorpay({
      description: `Paying for dishes ordered from ${this.restaurantService.orderDetail.restaurant.name}`,
      amount: this.cartAmount.toString(),
      prefill: {
        email: 'sunnysyed007@gmail.com',
        contact: '8961647380',
        name: "Syed Sabbir Sunny"
      }
    }).then(res => {
      alert("SUccessfully paid " + JSON.stringify(res))
    }).catch(err => {
      alert("Payment Error " + JSON.stringify(err))
    })
  }

}