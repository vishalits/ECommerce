//other modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';

//firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { LoginComponent } from './components/login/login.component';
import { FallbackComponent } from './components/shared/fallback/fallback.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartSectionComponent } from './components/shopping-cart/cart-section/cart-section.component';
import { CheckoutSectionComponent } from './components/shopping-cart/checkout-section/checkout-section.component';
import { OrderDetailComponent } from './components/admin/order-detail/order-detail.component';
import { FeedbackModalComponent } from './components/my-orders/feedback-modal/feedback-modal.component';
import { CustomerOrderInfoComponent } from './components/customer-order-info/customer-order-info.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrderSuccessComponent,
    LoginComponent,
    FallbackComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    ProductFormComponent,
    CartIconComponent,
    CartSectionComponent,
    CheckoutSectionComponent,
    OrderDetailComponent,
    FeedbackModalComponent,
    CustomerOrderInfoComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
    // AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    MatSnackBarModule,
    MatBadgeModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
