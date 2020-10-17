import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FashionCategoryPage } from './fashion-category.page';

const routes: Routes = [
  {
    path: '',
    component: FashionCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FashionCategoryPageRoutingModule {}
