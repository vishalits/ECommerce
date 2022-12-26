import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductsService } from 'src/app/services/admin/admin-products.service';
import { AuthServices } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  addedToCart = false;
  prod: any = {};
  loaded: boolean = false;
  selectedImage: string = '';
  selectedImageAlt: string = '';
  selectedColorCode: string = '';
  discountedPrice: number = 0;

  constructor(
    private productService: AdminProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private cart: CartService,
    private authService: AuthServices
  ) {
    console.log(this.selectedColorCode);
  }
  id: string = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('product-id') || '';

    this.productService.getProductById(this.id).then((resp) => {
      if (resp) {
        this.prod = { ...resp, techSpecs: JSON.parse(resp['techSpecs']) };
        this.selectedImage = this.prod.colors[0].image;
        this.selectedImageAlt =
          this.prod.title + ' ' + this.prod.colors[0].name;
        this.selectedColorCode = this.prod.colors[0].code;
        this.discountedPrice = Math.floor((this.prod.price / 100) * 25);
      } else {
        this.router.navigate(['/fallback']);
      }
      this.loaded = true;
    });

    this.cart.cartObservable.subscribe(
      (cart) => (this.addedToCart = Object.keys(cart).includes(this.id))
    );
  }

  buyNow(id: string) {
    this.authService.user.subscribe((resp) => {
      if (resp?.token) {
        this.cart.AddToCart(id);
        this.addedToCart = true;
        this.goToCart();
      } else {
        this.router.navigate(['login']);
      }
    });
  }
  addToCart(id: string) {
    this.authService.user.subscribe((resp) => {
      if (resp?.token) {
        this.cart.AddToCart(id);
        this.addedToCart = true;
      } else {
        this.router.navigate(['login']);
      }
    });
  }
  goToCart() {
    this.router.navigate(['cart']);
  }
}
