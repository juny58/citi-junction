import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { RestaurantCartComponent } from 'src/app/components/restaurant-cart/restaurant-cart.component';
import { InitializeService } from 'src/app/services/initialize/initialize.service';
import { environment } from 'src/environments/environment';
import { CuisineInterface, RestaurantInterface } from '../restaurants/restaurants.interface';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { IndividualCuisineOrder } from './restaurant-detail.interface';
import { RestaurantDetailService } from './restaurant-detail.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
})
export class RestaurantDetailPage implements OnInit {

  restaurant: RestaurantInterface
  cuisines: { [x: string]: CuisineInterface[] } = {}
  scrollTop: number = 0
  currency = environment.currency
  cuisinesLoaded = false

  constructor(private initializeService: InitializeService, private modalController: ModalController, private alertController: AlertController, public restaurantService: RestaurantsService, private actionSheetController: ActionSheetController, private activatedRoute: ActivatedRoute, private restaurantDetailService: RestaurantDetailService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(d => {
      if (d.restaurantId) {
        this.getRestaurant(d.restaurantId)
      }
    })
  }

  getRestaurant(_id: string) {
    this.restaurantDetailService.getRestaurant(_id).subscribe(r => {
      this.restaurant = r
      //console.log(r)
      this.getCuisines(r._id)
    })
  }

  getCuisines(_id: string) {
    this.restaurantDetailService.getCuisines(_id).subscribe(res => {
      this.createCuisinesBySection(res)
      //console.log(res)
    }, err => {
      console.log(err)
    })
  }

  createCuisinesBySection(rawCuisinesData: CuisineInterface[]) {
    rawCuisinesData.forEach(c => {
      if (!this.cuisines.hasOwnProperty(c.menuSection)) {
        this.cuisines[c.menuSection] = []
      }
      this.cuisines[c.menuSection].push(c)
    })
    //console.log(this.cuisines)
    this.cuisinesLoaded = true
  }

  contentScrolling(ev) {
    this.scrollTop = ev.detail.scrollTop
  }

  showSearchbar() { }

  addFoodToOrder(cuisine: CuisineInterface) {
    //console.log(cuisine)

    let isActionSheetButtonPressed = false

    let addOrderWithAddOn = async (addOn?: { name: string; price: number }) => {
      if (addOn != undefined) {
        isActionSheetButtonPressed = true
        let foundCuisineIndex = this.restaurantService.orderDetail.cuisines.findIndex(c => c.cuisine._id == cuisine._id && c.addOn && c.addOn.name == addOn.name)
        if (foundCuisineIndex >= 0) {
          // increase number
          this.restaurantService.orderDetail.cuisines[foundCuisineIndex].items += 1
          this.restaurantService.updateCart()
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
          if (!this.restaurantService.orderDetail.restaurant) {
            this.restaurantService.orderDetail.restaurant = {
              _id: this.restaurant._id,
              name: this.restaurant.title,
              coordinates: this.restaurant.address.coordinates
            }
            this.restaurantService.orderDetail.cuisines.push(orderCuisine)
            this.restaurantService.updateCart()
          } else {
            if (this.restaurantService.orderDetail.restaurant._id != this.restaurant._id) {
              let shouldRemoveOldFoodCart = await this.removeOldFoodCart()
              if (shouldRemoveOldFoodCart) {
                this.restaurantService.orderDetail.restaurant = {
                  _id: this.restaurant._id,
                  name: this.restaurant.title,
                  coordinates: this.restaurant.address.coordinates
                }
                this.restaurantService.orderDetail.cuisines.push(orderCuisine)
                this.restaurantService.updateCart()
              }
            } else {
              this.restaurantService.orderDetail.cuisines.push(orderCuisine)
              this.restaurantService.updateCart()
            }
          }
        }
      } else {
        let foundCuisineIndex = this.restaurantService.orderDetail.cuisines.findIndex(c => c.cuisine._id == cuisine._id && !c.addOn)
        if (foundCuisineIndex >= 0) {
          // increase number
          this.restaurantService.orderDetail.cuisines[foundCuisineIndex].items += 1
          this.restaurantService.updateCart()
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
          if (!this.restaurantService.orderDetail.restaurant) {
            this.restaurantService.orderDetail.restaurant = {
              _id: this.restaurant._id,
              name: this.restaurant.title,
              coordinates: this.restaurant.address.coordinates
            }
            this.restaurantService.orderDetail.cuisines.push(orderCuisine)
            this.restaurantService.updateCart()
          } else {
            if (this.restaurantService.orderDetail.restaurant._id != this.restaurant._id) {
              let shouldRemoveOldFoodCart = await this.removeOldFoodCart()
              if (shouldRemoveOldFoodCart) {
                this.restaurantService.orderDetail.restaurant = {
                  _id: this.restaurant._id,
                  name: this.restaurant.title,
                  coordinates: this.restaurant.address.coordinates
                }
                this.restaurantService.orderDetail.cuisines.push(orderCuisine)
                this.restaurantService.updateCart()
              }
            } else {
              this.restaurantService.orderDetail.cuisines.push(orderCuisine)
              this.restaurantService.updateCart()
            }
          }
        }
      }
      //console.log(this.restaurantService.orderDetail)
    }

    let addOrder = async () => {
      let foundCuisineIndex = this.restaurantService.orderDetail.cuisines.findIndex(c => c.cuisine._id == cuisine._id)
      //console.log(foundCuisineIndex)
      if (foundCuisineIndex >= 0) {
        // increase number
        this.restaurantService.orderDetail.cuisines[foundCuisineIndex].items += 1
        this.restaurantService.updateCart()
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
        if (!this.restaurantService.orderDetail.restaurant._id) {
          this.restaurantService.orderDetail.restaurant = {
            _id: this.restaurant._id,
            name: this.restaurant.title,
            coordinates: this.restaurant.address.coordinates
          }
          this.restaurantService.orderDetail.cuisines.push(orderCuisine)
          this.restaurantService.updateCart()
        } else {
          if (this.restaurantService.orderDetail.restaurant._id != this.restaurant._id) {
            let shouldRemoveOldFoodCart = await this.removeOldFoodCart()
            if (shouldRemoveOldFoodCart) {
              this.restaurantService.orderDetail.restaurant = {
                _id: this.restaurant._id,
                name: this.restaurant.title,
                coordinates: this.restaurant.address.coordinates
              }
              this.restaurantService.orderDetail.cuisines.push(orderCuisine)
              this.restaurantService.updateCart()
            }
          } else {
            this.restaurantService.orderDetail.cuisines.push(orderCuisine)
            this.restaurantService.updateCart()
          }
        }

      }
      //console.log(this.restaurantService.orderDetail)
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
        buttons: createButtons()
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
          cssClass: "remove-item-btn",
          handler: () => {
            this.restaurantService.resetCart()
            returnable = true
          }
        },
        {
          text: "Cancel",
          cssClass: "cancel-item-btn",
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

  async openCart() {
    if (this.restaurantService.orderDetail.cuisines.length && this.initializeService.initializeParams) {
      let modal = await this.modalController.create({
        component: RestaurantCartComponent
      })

      modal.present()
    }
  }

}