import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailComponent } from './categories/categories-detail/categories-detail.component';
import { ShopComponent } from './shop/shop.component';
import { ShopIndexComponent } from './shop/shop-index/shop-index.component';
import { CartComponent } from './cart/cart.component';
import { CartIndexComponent } from './cart/cart-index/cart-index.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', component: HomeContentComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'product-detail/:productName', component: ProductComponent, children: [
      { path: '', component: ProductDetailComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'category-detail/:categoryName', component: CategoriesComponent, children: [
      { path: '', component: CategoriesDetailComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'shop', component: ShopComponent, children: [
      { path: '', component: ShopIndexComponent, pathMatch: 'full' },
    ]
  },
  {
    path: 'cart', component: CartComponent, children: [
      { path: '', component: CartIndexComponent, pathMatch: 'full' },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword/:id/:token', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
