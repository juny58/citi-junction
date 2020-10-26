import { Component, Input, OnInit } from '@angular/core';
import { FoodOrderInterface, FoodOrderStatusEnum } from '../../tabs/orders/orders.interface';

@Component({
  selector: 'app-food-order-progress',
  templateUrl: './food-order-progress.component.html',
  styleUrls: ['./food-order-progress.component.scss'],
})
export class FoodOrderProgressComponent implements OnInit {

  @Input() order: FoodOrderInterface

  orderStatusEnum = FoodOrderStatusEnum

  constructor() { }

  ngOnInit() { }

}
