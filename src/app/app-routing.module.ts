import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'product-list/:categoryId',
    loadChildren: () => import('./pages/product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'product-details/:productId',
    loadChildren: () => import('./pages/product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./pages/restaurants/restaurants.module').then( m => m.RestaurantsPageModule)
  },
  {
    path: 'fashion',
    loadChildren: () => import('./pages/fashion/fashion.module').then( m => m.FashionPageModule)
  },
  {
    path: 'fashion/:category',
    loadChildren: () => import('./pages/fashion-category/fashion-category.module').then( m => m.FashionCategoryPageModule)
  },
  {
    path: 'restaurant-detail/:restaurantId',
    loadChildren: () => import('./pages/restaurant-detail/restaurant-detail.module').then( m => m.RestaurantDetailPageModule),
    data: {param: 'restaurantId'}
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-condition',
    loadChildren: () => import('./pages/terms-condition/terms-condition.module').then( m => m.TermsConditionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
