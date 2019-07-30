import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TokenInterceptor } from './token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertDangerComponent } from './shared/alert-danger/alert-danger.component';
import { AlertSuccessComponent } from './shared/alert-success/alert-success.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeContentComponent } from './home/home-content/home-content.component';
import { ProductComponent } from './product/product.component';
import { KebabPipe } from './shared/pipes/kebab.pipe';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailComponent } from './categories/categories-detail/categories-detail.component';
import { RatingsComponent } from './shared/ratings/ratings.component';
import { ShopComponent } from './shop/shop.component';
import { ShopIndexComponent } from './shop/shop-index/shop-index.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    KebabPipe,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AlertDangerComponent,
    AlertSuccessComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HeaderComponent,
    FooterComponent,
    HomeContentComponent,
    ProductComponent,
    ProductDetailComponent,
    CategoriesComponent,
    CategoriesDetailComponent,
    RatingsComponent,
    ShopComponent,
    ShopIndexComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
