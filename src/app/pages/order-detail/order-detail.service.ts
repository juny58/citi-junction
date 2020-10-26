import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FoodOrderInterface } from '../tabs/orders/orders.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private httpClient: HttpClient) { }

  getOrderById(_id: string) {
    return this.httpClient.get<FoodOrderInterface>(environment.apiPath + "/api/orders/get-order-by-id", { params: { _id } })
  }
}
