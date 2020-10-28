import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FoodOrderInterface, FoodOrderStatusEnum } from './orders.interface';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders: FoodOrderInterface[] = []
  colorJson = {
    'Processing': "women",
    'Picked Up': "warning",
    'Preparing Food': "warning",
    'Delivered': "mat-blue",
    "Cancelled & Refund initiated": "danger",
    'Refunded': "kola-pata",
    'Completed': 'success'
  }
  isLoading = true

  constructor(private ordersService: OrdersService, private authService: AuthService) { }

  ngOnInit() {
    this.getOrders()
  }

  async getOrders() {
    if (!this.authService.user.email) {
      await this.authService.getCurrentUser()
    }
    let obj = {
      "orderedBy.email": {
        equality: "==",
        value: this.authService.user.email
      },
      "orderStatus": {
        equality: "!=",
        value: "Completed"
      }
    }

    this.ordersService.getOrders({
      where: JSON.stringify(obj),
      orderBy: "orderStatus"
    }).subscribe(d => {
      console.log(d)
      this.isLoading = false
      this.orders = d
    })
  }

}
