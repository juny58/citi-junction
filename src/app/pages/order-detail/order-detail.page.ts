import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FoodOrderInterface, FoodOrderStatusEnum } from '../tabs/orders/orders.interface';
import { OrderDetailService } from './order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  orderId: string
  isOrderSuccess: boolean
  order: FoodOrderInterface
  currency = environment.currency
  orderStatusEnum = FoodOrderStatusEnum

  constructor(private activatedRoute: ActivatedRoute, private orderDetailService: OrderDetailService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(d => {
      this.orderId = d._id
      this.getOrderById()
      this.isOrderSuccess = d['order-success'] == 'true' ? true : false
      setTimeout(() => {
        this.isOrderSuccess = false
      }, 3000);
    })
  }

  getOrderById() {
    this.orderDetailService.getOrderById(this.orderId).subscribe(d => {
      this.order = d
      // console.log(d)
    })
  }

}
