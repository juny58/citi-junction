import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuisineSearchPage } from './cuisine-search.page';

const routes: Routes = [
  {
    path: '',
    component: CuisineSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuisineSearchPageRoutingModule {}
