import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FoodOrder } from '../restaurant-detail/restaurant-detail.interface';
import { RestaurantInterface } from './restaurants.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService implements OnInit {

  orderDetail: FoodOrder = JSON.parse(localStorage.getItem('cart')) || {
    cuisines: [],
    orderedAt: null,
    orderedBy: {
      name: null,
      email: null,
      phone: null,
      address: null,
      coordinates: null
    },
    totalAmount: null,
    tax: null,
    discount: null,
    deliveredAt: null,
    deliveryCharge: null,
    restaurant: {
      _id: null,
      name: null,
      coordinates: []
    }
  }

  cartItemCount = 0

  constructor(private httpClient: HttpClient, private zone: NgZone) {
    this.orderDetail.cuisines.forEach(c => {
      zone.run(() => this.cartItemCount += c.items)
    })
  }

  ngOnInit() { }

  getCuisineCategories() {
    return this.httpClient.get(environment.apiPath + "/api/restaurants/get-cuisine-categories")
  }

  getRestaurants(params: any) {
    return this.httpClient.get<RestaurantInterface[]>(environment.apiPath + "/api/restaurants/get-restaurants", { params })
  }

  updateCart(n?: number) {
    if (n == undefined || n == null) {
      this.cartItemCount++
    } else {
      this.cartItemCount += n
    }
    if (!this.cartItemCount) {
      this.resetCart()
    }
    localStorage.setItem('cart', JSON.stringify(this.orderDetail))
    // console.log(this.orderDetail)
  }

  resetCart() {
    this.orderDetail = {
      cuisines: [],
      orderedAt: null,
      orderedBy: {
        name: null,
        email: null,
        phone: null,
        address: null,
        coordinates: null
      },
      totalAmount: null,
      tax: null,
      discount: null,
      deliveredAt: null,
      deliveryCharge: null,
      restaurant: {
        _id: null,
        name: null,
        coordinates: {
          lat: null,
          long: null
        }
      }
    }
    this.cartItemCount = 0
  }
}
