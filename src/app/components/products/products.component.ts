import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/app/services/auth/auth.service';
import { Product } from 'src/app/services/products/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] | null = null;

  isAuth: boolean = false;
  cart: any;
  constructor(
    private productService: ProductsService,
    private cartServices: CartService,
    private authService: AuthServices,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.authService.user.subscribe((resp) => {
      if (resp?.token) {
        this.isAuth = true;
      }
    });
    this.cart = this.cartServices.cart;
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
    });
  }

  addToCartHandler(productId: any) {
    if (this.isAuth) {
      this.cartServices.AddToCart(productId);
    } else {
      this.router.navigate(['/login']);
    }
  }

  isAdded(pId: any) {
    const count = this.cart[pId];
    return this.cart[pId] ? count : 0;
  }

  incrementCart(pId: any) {
    this.cartServices.cartOperations(pId, '+');
  }
  decrementCart(pId: any) {
    this.cartServices.cartOperations(pId, '-');
  }

  navigateToDetails(id: any) {
    this.router.navigate([`/products/${id}`]);
  }
}
