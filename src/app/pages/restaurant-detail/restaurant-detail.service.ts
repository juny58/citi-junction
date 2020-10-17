import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuisineInterface, RestaurantInterface } from '../restaurants/restaurants.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDetailService {

  restaurant: RestaurantInterface

  constructor(private httpClient: HttpClient) { }

  setRestaurant(res: RestaurantInterface) {
    this.restaurant = res
  }

  getRestaurant(_id?: string): Observable<RestaurantInterface> {
    return new Observable(observable => {
      if (this.restaurant) {
        observable.next(this.restaurant)
        observable.complete()
      } else {
        this.httpClient.get<RestaurantInterface>(environment.apiPath + "/api/restaurants/get-restaurant", { params: { _id } }).subscribe(r => {
          observable.next(r)
        })
      }
    })
  }

  getCuisines(_id: string) {
    return this.httpClient.get<CuisineInterface[]>(environment.apiPath + "/api/restaurants/get-cuisines-by-restaurant", {params: {restaurantId: _id}})
  }
}