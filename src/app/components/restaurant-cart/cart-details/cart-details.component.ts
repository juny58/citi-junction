import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestaurantsService } from 'src/app/pages/restaurants/restaurants.service';
import { InitializeService } from 'src/app/services/initialize/initialize.service';
import { environment } from 'src/environments/environment';
import { EmittingAddress } from '../cart-select-address/cart-select-address.component';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent implements OnInit {

  currency = environment.currency
  itemsPrice = 0
  deliveryCharge = 0
  totalPrice = 0
  @Input() address: EmittingAddress
  @Output() addressChangeEvent: EventEmitter<void> = new EventEmitter()
  @Output() setCartAmount = new EventEmitter()

  constructor(public restaurantService: RestaurantsService, public initializeService: InitializeService) { }

  ngOnInit() {
    this.getTotalPrice()
    this.deliveryCharge = Number(this.initializeService.initializeParams.restaurant.delivery.costPerKm)
  }

  modifyQuantity(n: number, item) {
    let i = this.restaurantService.orderDetail.cuisines.findIndex(c => c.cuisine._id == item.cuisine._id)
    if (n < 0) {
      if (this.restaurantService.orderDetail.cuisines[i].items == 1) {
        this.restaurantService.orderDetail.cuisines.splice(i, 1)
      } else {
        this.restaurantService.orderDetail.cuisines[i].items += n
      }
    } else {
      this.restaurantService.orderDetail.cuisines[i].items += n
    }
    this.restaurantService.updateCart(n)
    this.getTotalPrice()
  }

  getTotalPrice() {
    this.itemsPrice = 0;
    this.restaurantService.orderDetail.cuisines.forEach(c => {
      this.itemsPrice += c.items * c.price
    })
  }

  changeAddress() {
    this.addressChangeEvent.emit()
  }

  getDeliveryCharge() {
    if (this.itemsPrice < this.initializeService.initializeParams.restaurant.delivery.freeAbove) {
      return (Math.floor(this.address.distanceInKm) + 1) * this.deliveryCharge
    }
    return 0
  }

  getTotalPayable() {
    let payable = this.itemsPrice + this.getDeliveryCharge()
    this.setCartAmount.emit(payable)
    return payable
  }

}
