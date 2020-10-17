import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonTextComponent } from './skeleton-text/skeleton-text.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SkeletonTextComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [SkeletonTextComponent]
})
export class CustomComponentsModule { }
