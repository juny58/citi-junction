import { Component, OnInit, ViewChild } from '@angular/core';
import { WidthService } from 'src/app/services/width/width.service';
import { SearchService } from 'src/app/services/search/search.service';
import { IonContent, IonInfiniteScroll, IonSearchbar, ModalController, ToastController } from '@ionic/angular';
import { RestaurantsService } from './restaurants.service';
import { RestaurantCategories, RestaurantInterface } from './restaurants.interface';
import { environment } from 'src/environments/environment';
import { RestaurantDetailService } from '../restaurant-detail/restaurant-detail.service';
import { RestaurantCartComponent } from 'src/app/components/restaurant-cart/restaurant-cart.component';
import { InitializeService } from 'src/app/services/initialize/initialize.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, { static: true }) ionContent: IonContent

  categories: string[] = []
  slideOptions = {
    slidesPerView: 4.72,
    spaceBetween: 30,
    resistance: false
  }
  selectedCategory = 'All'
  restaurants: RestaurantInterface[] = []
  currency = environment.currency
  isLoading = true
  apiParams: any = {
    limit: 10
  };
  showSlides
  isLoadingApi
  alreadyCalledCart

  constructor(private toastController: ToastController, private authService: AuthService, private initializeService: InitializeService, private modalController: ModalController, public restaurantDetailService: RestaurantDetailService, public widthService: WidthService, public searchService: SearchService, public restaurantService: RestaurantsService) { }

  ngOnInit() {
    this.getCategories()
    this.getRestaurants()
  }

  getCategories() {
    this.categories = [RestaurantCategories.biriyani, RestaurantCategories.chinese, RestaurantCategories.fastfood, RestaurantCategories.indian, RestaurantCategories.tandoor, RestaurantCategories.softdrinksandicecream, RestaurantCategories.sweets, RestaurantCategories.vegetarian, RestaurantCategories.soups, RestaurantCategories.southindian]
  }

  selectCategory(cat: RestaurantCategories) {
    this.infiniteScroll.disabled = false
    if (this.apiParams.startAfter) {
      delete this.apiParams.startAfter
    }
    if (cat != this.selectedCategory) {
      this.selectedCategory = cat
      // console.log(cat)
      this.apiParams.where = JSON.stringify({
        categoriesServed: {
          equality: "array-contains",
          value: cat
        }
      })

      this.getRestaurants()
    } else {
      this.selectedCategory = "All"
      delete this.apiParams.where
      this.getRestaurants()
    }
    this.restaurants = []
  }

  getRestaurants() {
    this.isLoading = true
    this.ionContent.scrollToTop()
    this.restaurantService.getRestaurants(this.apiParams).subscribe(d => {
      // console.log(d)
      this.restaurants = d
      this.isLoading = false
    })
  }

  setRestaurantForDetailPage(restaurant: RestaurantInterface) {
    this.restaurantDetailService.setRestaurant(restaurant)
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

  loadMoreData(ev) {
    this.apiParams.startAfter = this.restaurants[this.restaurants.length - 1].title
    this.restaurantService.getRestaurants(this.apiParams).subscribe(d => {
      // console.log(d)
      this.restaurants = this.restaurants.concat(d)
      ev.target.complete()
      if (d.length < this.apiParams.limit) {
        ev.target.disabled = true
      }
    })
  }

  ionViewDidEnter() {
    this.showSlides = true
  }

}