import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantDetailPageRoutingModule } from './restaurant-detail-routing.module';

import { RestaurantDetailPage } from './restaurant-detail.page';
import { CustomComponentsModule } from 'src/app/custom-components/custom-components.module';
import { RestaurantCartModule } from 'src/app/components/restaurant-cart/restaurant-cart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantDetailPageRoutingModule,
    CustomComponentsModule,
    RestaurantCartModule
  ],
  declarations: [RestaurantDetailPage]
})
export class RestaurantDetailPageModule {}
