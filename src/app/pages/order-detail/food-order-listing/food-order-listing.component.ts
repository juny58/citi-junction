import { Component, Input, OnInit } from '@angular/core';
import { FoodOrderInterface } from '../../tabs/orders/orders.interface';

@Component({
  selector: 'app-food-order-listing',
  templateUrl: './food-order-listing.component.html',
  styleUrls: ['./food-order-listing.component.scss'],
})
export class FoodOrderListingComponent implements OnInit {

  @Input() order: FoodOrderInterface

  constructor() { }

  ngOnInit() {}

}
