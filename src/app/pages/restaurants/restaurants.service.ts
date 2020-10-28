import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { IndividualCuisineOrder } from '../restaurant-detail/restaurant-detail.interface';
import { FoodOrderDetailInterface } from '../tabs/orders/orders.interface';
import { CuisineInterface, RestaurantInterface } from './restaurants.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService implements OnInit {

  orderDetail: FoodOrderDetailInterface = JSON.parse(localStorage.getItem('cart')) || {
    cuisines: [],
    restaurant: {
      _id: null,
      name: null,
      coordinates: []
    }
  }

  cartItemCount = 0
  currency = environment.currency

  constructor(private toastController: ToastController, private alertController: AlertController, private httpClient: HttpClient, private zone: NgZone, private actionSheetController: ActionSheetController) {
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

  getRestaurant(_id: any) {
    return this.httpClient.get<RestaurantInterface>(environment.apiPath + "/api/restaurants/get-restaurant", { params: { _id } })
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
    // console.log(this.orderDetail)
  }

  resetCart() {
    this.orderDetail = {
      cuisines: [],
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
    localStorage.setItem('cart', JSON.stringify(this.orderDetail))
  }

  async addFoodToOrder(cuisine: CuisineInterface, restaurant: RestaurantInterface) {
    //console.log(cuisine)

    let isActionSheetButtonPressed = false

    let addOrderWithAddOn = async (addOn?: { name: string; price: number }) => {
      if (addOn != undefined) {
        isActionSheetButtonPressed = true
        let foundCuisineIndex = this.orderDetail.cuisines.findIndex(c => c.cuisine._id == cuisine._id && c.addOn && c.addOn.name == addOn.name)
        if (foundCuisineIndex >= 0) {
          // increase number
          this.orderDetail.cuisines[foundCuisineIndex].items += 1
          this.updateCart()
          this.showAddedToCartToast()
        } else {
          // push
          let orderCuisine: IndividualCuisineOrder = {
            cuisine: {
              _id: cuisine._id,
              name: cuisine.title
            },
            addOn: addOn,
            price: cuisine.price + addOn.price,
            cost: cuisine.cost + addOn.price,
            items: 1
          }
          if (!this.orderDetail.restaurant) {
            this.orderDetail.restaurant = {
              _id: restaurant._id,
              name: restaurant.title,
              coordinates: restaurant.address.coordinates
            }
            this.orderDetail.cuisines.push(orderCuisine)
            this.updateCart()
            this.showAddedToCartToast()
          } else {
            if (this.orderDetail.restaurant._id && this.orderDetail.restaurant._id != restaurant._id) {
              let shouldRemoveOldFoodCart = await this.removeOldFoodCart()
              if (shouldRemoveOldFoodCart) {
                this.orderDetail.restaurant = {
                  _id: restaurant._id,
                  name: restaurant.title,
                  coordinates: restaurant.address.coordinates
                }
                this.orderDetail.cuisines.push(orderCuisine)
                this.updateCart()
                this.showAddedToCartToast()
              }
            } else {
              this.orderDetail.cuisines.push(orderCuisine)
              this.updateCart()
              this.showAddedToCartToast()
            }
          }
        }
      } else {
        let foundCuisineIndex = this.orderDetail.cuisines.findIndex(c => c.cuisine._id == cuisine._id && !c.addOn)
        if (foundCuisineIndex >= 0) {
          // increase number
          this.orderDetail.cuisines[foundCuisineIndex].items += 1
          this.updateCart()
          this.showAddedToCartToast()
        } else {
          // push
          let orderCuisine: IndividualCuisineOrder = {
            cuisine: {
              _id: cuisine._id,
              name: cuisine.title
            },
            addOn: addOn,
            price: cuisine.price,
            cost: cuisine.cost,
            items: 1
          }
          if (!this.orderDetail.restaurant) {
            this.orderDetail.restaurant = {
              _id: restaurant._id,
              name: restaurant.title,
              coordinates: restaurant.address.coordinates
            }
            this.orderDetail.cuisines.push(orderCuisine)
            this.updateCart()
            this.showAddedToCartToast()
          } else {
            if (this.orderDetail.restaurant._id && this.orderDetail.restaurant._id != restaurant._id) {
              let shouldRemoveOldFoodCart = await this.removeOldFoodCart()
              if (shouldRemoveOldFoodCart) {
                this.orderDetail.restaurant = {
                  _id: restaurant._id,
                  name: restaurant.title,
                  coordinates: restaurant.address.coordinates
                }
                this.orderDetail.cuisines.push(orderCuisine)
                this.updateCart()
                this.showAddedToCartToast()
              }
            } else {
              this.orderDetail.cuisines.push(orderCuisine)
              this.updateCart()
              this.showAddedToCartToast()
            }
          }
        }
      }
      //console.log(this.orderDetail)
    }

    let addOrder = async () => {
      let foundCuisineIndex = this.orderDetail.cuisines.findIndex(c => c.cuisine._id == cuisine._id)
      //console.log(foundCuisineIndex)
      if (foundCuisineIndex >= 0) {
        // increase number
        this.orderDetail.cuisines[foundCuisineIndex].items += 1
        this.updateCart()
        this.showAddedToCartToast()
      } else {
        // push
        let orderCuisine: IndividualCuisineOrder = {
          cuisine: {
            _id: cuisine._id,
            name: cuisine.title
          },
          price: cuisine.price,
          cost: cuisine.cost,
          items: 1
        }
        if (!this.orderDetail.restaurant._id) {
          this.orderDetail.restaurant = {
            _id: restaurant._id,
            name: restaurant.title,
            coordinates: restaurant.address.coordinates
          }
          this.orderDetail.cuisines.push(orderCuisine)
          this.updateCart()
          this.showAddedToCartToast()
        } else {
          if (this.orderDetail.restaurant._id && this.orderDetail.restaurant._id != restaurant._id) {
            let shouldRemoveOldFoodCart = await this.removeOldFoodCart()
            if (shouldRemoveOldFoodCart) {
              this.orderDetail.restaurant = {
                _id: restaurant._id,
                name: restaurant.title,
                coordinates: restaurant.address.coordinates
              }
              this.orderDetail.cuisines.push(orderCuisine)
              this.updateCart()
              this.showAddedToCartToast()
            }
          } else {
            this.orderDetail.cuisines.push(orderCuisine)
            this.updateCart()
            this.showAddedToCartToast()
          }
        }

      }
      //console.log(this.orderDetail)
    }

    let createButtons = () => {
      return cuisine.addOnPrice.map(p => {
        return {
          text: p.name + " " + this.currency + p.price,
          icon: "cart",
          handler: () => {
            addOrderWithAddOn(p)
          }
        }
      })
    }

    if (cuisine.addOnPrice.length) {
      this.actionSheetController.create({
        header: "Add On",
        buttons: createButtons(),
        cssClass: 'addon'
      }).then(sheet => {
        sheet.present()
        sheet.onDidDismiss().then(() => {
          if (!isActionSheetButtonPressed) {
            addOrderWithAddOn()
          }
        })
      })
    } else {
      addOrder()
    }
  }

  async removeOldFoodCart(): Promise<boolean> {
    let returnable = false
    let alert = await this.alertController.create({
      header: "Empty Food Cart?",
      subHeader: "Your foodcart already has items from another restaurant",
      message: "Order from multiple restaurants not allowed. Remove old cart?",
      buttons: [
        {
          text: "Remove",
          cssClass: "red-alert-btn",
          handler: () => {
            this.resetCart()
            returnable = true
          }
        },
        {
          text: "Cancel",
          cssClass: "dark-alert-btn",
          handler: () => {
            returnable = false
          }
        }
      ]
    })

    alert.present()

    return alert.onDidDismiss().then(() => {
      return returnable
    })
  }

  async showAddedToCartToast() {
    let toast = await this.toastController.create({
      message: "Item added to cart.",
      cssClass: 'add-to-cart-toast',
      duration: 2000
    })
    toast.present()
  }
}
