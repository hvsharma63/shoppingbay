import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { ProductsComponent } from './products/products.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { ProductIndexComponent } from './products/product-index/product-index.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderIndexComponent } from './orders/order-index/order-index.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { ProductRatingsComponent } from './product-ratings/product-ratings.component';
import { ProductRatingsIndexComponent } from './product-ratings/product-ratings-index/product-ratings-index.component';
import { DealsComponent } from './deals/deals.component';
import { DealsIndexComponent } from './deals/deals-index/deals-index.component';
import { DealsAddComponent } from './deals/deals-add/deals-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/login', component: LoginComponent },
  {
    // tslint:disable-next-line: max-line-length
    path: 'admin/dashboard', canActivate: [AuthGuardService], component: DashboardComponent, children: [
      {
        path: 'categories',
        component: CategoriesComponent,
        children: [
          {
            path: 'add',
            component: CategoryAddComponent
          }
        ]
      },
      {
        path: 'products',
        component: ProductsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: ProductIndexComponent
          },
          {
            path: 'add',
            component: ProductAddComponent
          },
          {
            path: ':id/update',
            component: ProductUpdateComponent
          }
        ]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: OrderIndexComponent
          },
          {
            path: ':id/details',
            component: OrderDetailsComponent
          },
        ]
      },
      {
        path: 'ratings',
        component: ProductRatingsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: ProductRatingsIndexComponent
          },

        ]
      },
      {
        path: 'deals',
        component: DealsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'index'
          },
          {
            path: 'index',
            component: DealsIndexComponent
          },
          {
            path: 'add',
            component: DealsAddComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
