import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonSearchbar, ModalController } from '@ionic/angular';
import algoliasearch from 'algoliasearch';
import { RestaurantCartComponent } from 'src/app/components/restaurant-cart/restaurant-cart.component';
import { InitializeService } from 'src/app/services/initialize/initialize.service';
import { environment } from 'src/environments/environment';
import { CuisineInterface, RestaurantInterface } from '../restaurants/restaurants.interface';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Component({
  selector: 'app-cuisine-search',
  templateUrl: './cuisine-search.page.html',
  styleUrls: ['./cuisine-search.page.scss'],
})
export class CuisineSearchPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild(IonSearchbar) ionSearchbar: IonSearchbar

  client = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);
  index = this.client.initIndex('cuisines')
  searchTerm: string
  cuisines = []
  paginationIndex = 0
  currency = environment.currency
  showNoDataMessage = false
  restaurant: RestaurantInterface
  loadingRestaurantIndex: number
  searchingNow: boolean

  constructor(public restaurantService: RestaurantsService, public initializeService: InitializeService, public modalController: ModalController) { }

  ngOnInit() { }

  searchTyped(searchTerm: string) {
    this.loadingRestaurantIndex = undefined
    this.searchTerm = searchTerm
    if (searchTerm.length >= 3) {
      this.paginationIndex = 0
      this.cuisines = []
      this.infiniteScroll.disabled = false
      this.ionContent.scrollToTop()
      this.getSearchedProducts()
    }
  }

  getSearchedProducts(ev?) {
    let perPageResult = 15
    this.searchingNow = true
    this.index.search(this.searchTerm, {
      page: this.paginationIndex,
      hitsPerPage: perPageResult
    }).then(res => {
      // console.log(res.hits)
      this.searchingNow = false
      this.cuisines = this.cuisines.concat(res.hits)
      if (!this.cuisines.length) {
        this.showNoDataMessage = true
      } else {
        this.showNoDataMessage = false
      }
      if (ev != undefined && ev != null) {
        ev.target.complete()
        if (res.hits.length < perPageResult) {
          ev.target.disabled = true
        }
      }
    })
  }

  loadMoreData(ev) {
    this.paginationIndex++
    this.getSearchedProducts(ev)
  }

  async openCart() {
    if (this.restaurantService.orderDetail.cuisines.length && this.initializeService.initializeParams) {
      let modal = await this.modalController.create({
        component: RestaurantCartComponent
      })
      modal.present()
    }
  }

  async addtoCart(cuisine: CuisineInterface, restaurantId: string, i: number) {
    this.loadingRestaurantIndex = i
    let restaurant = await this.getRestaurant(restaurantId)
    this.loadingRestaurantIndex = undefined
    this.restaurantService.addFoodToOrder(cuisine, restaurant)
  }

  getRestaurant(_id): Promise<RestaurantInterface> {
    return new Promise(resolve => {
      if (this.restaurant && this.restaurant._id == _id) {
        resolve(this.restaurant)
      } else {
        this.restaurantService.getRestaurant(_id).subscribe(res => {
          this.restaurant = res;
          resolve(res)
        })
      }
    })
  }

  ionViewDidEnter() {
    this.ionSearchbar.setFocus()
  }

}
