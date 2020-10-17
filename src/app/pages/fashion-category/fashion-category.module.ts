import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FashionCategoryPageRoutingModule } from './fashion-category-routing.module';

import { FashionCategoryPage } from './fashion-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FashionCategoryPageRoutingModule
  ],
  declarations: [FashionCategoryPage]
})
export class FashionCategoryPageModule {}
