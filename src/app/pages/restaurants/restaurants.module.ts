import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantsPageRoutingModule } from './restaurants-routing.module';

import { RestaurantsPage } from './restaurants.page';
import { CustomComponentsModule } from 'src/app/custom-components/custom-components.module';
import { RestaurantCartModule } from 'src/app/components/restaurant-cart/restaurant-cart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantsPageRoutingModule,
    CustomComponentsModule,
    RestaurantCartModule
  ],
  declarations: [RestaurantsPage]
})
export class RestaurantsPageModule {}
