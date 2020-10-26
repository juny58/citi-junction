import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodOrderInterface } from 'src/app/pages/tabs/orders/orders.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantCartService {

  constructor(private httpClient: HttpClient) { }

  createOrder(foodOrder: FoodOrderInterface) {
    return this.httpClient.post<FoodOrderInterface>(environment.apiPath + "/api/payment/create-order", foodOrder)
  }

}
