import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthenticationService } from './services/auth.service';
import { CategoriesComponent } from './categories/categories.component';
import { DataTablesModule } from 'angular-datatables';
import { TokenInterceptor } from './token.interceptor';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { ProductIndexComponent } from './products/product-index/product-index.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderIndexComponent } from './orders/order-index/order-index.component';
import { ProductRatingsComponent } from './product-ratings/product-ratings.component';
import { ProductRatingsIndexComponent } from './product-ratings/product-ratings-index/product-ratings-index.component';
import { DealsComponent } from './deals/deals.component';
import { DealsIndexComponent } from './deals/deals-index/deals-index.component';
import { DealsAddComponent } from './deals/deals-add/deals-add.component';
import { DealsUpdateComponent } from './deals/deals-update/deals-update.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    CategoriesComponent,
    CategoryAddComponent,
    FileSelectDirective,
    ProductsComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    ProductIndexComponent,
    OrdersComponent,
    OrderIndexComponent,
    ProductRatingsComponent,
    ProductRatingsIndexComponent,
    DealsComponent,
    DealsIndexComponent,
    DealsAddComponent,
    DealsUpdateComponent
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
