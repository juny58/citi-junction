import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FoodOrderInterface } from './orders.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  deleteOrder(_id: string) {
    return this.httpClient.post(environment.apiPath + "/api/orders/delete-order", { _id })
  }

  getOrders(obj?) {
    if (obj == undefined) {
      return this.httpClient.get<FoodOrderInterface[]>(environment.apiPath + "/api/orders/get-orders")
    } else {
      return this.httpClient.get<FoodOrderInterface[]>(environment.apiPath + "/api/orders/get-orders", { params: obj })
    }
  }
}
