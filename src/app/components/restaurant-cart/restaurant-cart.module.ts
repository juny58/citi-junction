import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantCartComponent } from './restaurant-cart.component';
import { IonicModule } from '@ionic/angular';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartSelectAddressComponent } from './cart-select-address/cart-select-address.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RestaurantCartComponent, CartDetailsComponent, CartSelectAddressComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [RestaurantCartComponent],
  entryComponents: [RestaurantCartComponent]
})
export class RestaurantCartModule { }
