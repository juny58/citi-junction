import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard/auth-guard.guard';
import { RedirectGuard } from './guards/redirect/redirect.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'product-list/:categoryId',
    loadChildren: () => import('./pages/product-list/product-list.module').then(m => m.ProductListPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'product-details/:productId',
    loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./pages/restaurants/restaurants.module').then(m => m.RestaurantsPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'fashion',
    loadChildren: () => import('./pages/fashion/fashion.module').then(m => m.FashionPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'fashion/:category',
    loadChildren: () => import('./pages/fashion-category/fashion-category.module').then(m => m.FashionCategoryPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'restaurant-detail/:restaurantId',
    loadChildren: () => import('./pages/restaurant-detail/restaurant-detail.module').then(m => m.RestaurantDetailPageModule),
    data: { param: 'restaurantId' },
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'cuisine-search',
    loadChildren: () => import('./pages/cuisine-search/cuisine-search.module').then(m => m.CuisineSearchPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./pages/order-detail/order-detail.module').then( m => m.OrderDetailPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-condition',
    loadChildren: () => import('./pages/terms-condition/terms-condition.module').then(m => m.TermsConditionPageModule),
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsPageModule),
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsPageModule),
  },
  {
    path: 'refund',
    loadChildren: () => import('./pages/refund/refund.module').then(m => m.RefundPageModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'android',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule),
    canActivate: [RedirectGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
