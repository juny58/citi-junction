import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderDetailPageRoutingModule } from './order-detail-routing.module';

import { OrderDetailPage } from './order-detail.page';
import { FoodOrderProgressComponent } from './food-order-progress/food-order-progress.component';
import { FoodOrderListingComponent } from './food-order-listing/food-order-listing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderDetailPageRoutingModule
  ],
  declarations: [OrderDetailPage, FoodOrderProgressComponent, FoodOrderListingComponent]
})
export class OrderDetailPageModule {}
