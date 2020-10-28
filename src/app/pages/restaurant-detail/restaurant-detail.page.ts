import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { RestaurantCartComponent } from 'src/app/components/restaurant-cart/restaurant-cart.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InitializeService } from 'src/app/services/initialize/initialize.service';
import { environment } from 'src/environments/environment';
import { CuisineInterface, RestaurantInterface } from '../restaurants/restaurants.interface';
import { RestaurantsService } from '../restaurants/restaurants.service';
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
  isLoadingApi
  alreadyCalledCart

  constructor(private toastController: ToastController, private authService: AuthService, private initializeService: InitializeService, private modalController: ModalController, public restaurantService: RestaurantsService, private activatedRoute: ActivatedRoute, private restaurantDetailService: RestaurantDetailService) { }

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

  addFoodToOrder(cuisine: CuisineInterface) {
    this.restaurantService.addFoodToOrder(cuisine, this.restaurant)
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
    this.cuisinesLoaded = true
  }

  contentScrolling(ev) {
    this.scrollTop = ev.detail.scrollTop
  }

  async openCart() {
    if (this.alreadyCalledCart) {
      return
    }
    this.isLoadingApi = true
    this.alreadyCalledCart = true
    if (!this.authService.user.name) {
      await this.authService.getCurrentUser()
    }
    if (!this.initializeService.initializeParams) {
      await this.initializeService.getInitializingParams()
    }
    this.isLoadingApi = false
    if (this.restaurantService.orderDetail.cuisines.length) {
      let modal = await this.modalController.create({
        component: RestaurantCartComponent
      })
      modal.present()
    } else {
      let toast = await this.toastController.create({
        message: "No food item added yet",
        duration: 2000,
        position: 'top'
      })
      toast.present()
    }
    this.alreadyCalledCart = false
  }


}