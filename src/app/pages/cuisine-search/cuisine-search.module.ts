import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuisineSearchPageRoutingModule } from './cuisine-search-routing.module';

import { CuisineSearchPage } from './cuisine-search.page';
import { RestaurantCartModule } from 'src/app/components/restaurant-cart/restaurant-cart.module';
import { CustomComponentsModule } from 'src/app/custom-components/custom-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuisineSearchPageRoutingModule,
    RestaurantCartModule,
    CustomComponentsModule
  ],
  declarations: [CuisineSearchPage]
})
export class CuisineSearchPageModule {}
