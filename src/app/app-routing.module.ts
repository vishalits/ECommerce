import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { FallbackComponent } from './components/shared/fallback/fallback.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthGuard } from './services/auth/auth.guard';
import { OrderDetailComponent } from './components/admin/order-detail/order-detail.component';
import { AdminGuard } from './services/auth/admin.guard';
import { CustomerOrderInfoComponent } from './components/customer-order-info/customer-order-info.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  {
    path: 'orders/:order-id',
    component: CustomerOrderInfoComponent,
    canActivate: [AuthGuard],
  },
  { path: 'checkout', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:product-id', component: ProductDetailsComponent },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/orders/:order-id',
    component: OrderDetailComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/products/:product-id',
    component: ProductFormComponent,
    canActivate: [AdminGuard],
  },
  { path: 'fallback', component: FallbackComponent },
  { path: '**', component: FallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
