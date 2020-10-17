import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollbarDirectiveModule } from 'src/app/directives/scrollbar/scrollbar.directive.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatTooltipModule,
    ScrollbarDirectiveModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
