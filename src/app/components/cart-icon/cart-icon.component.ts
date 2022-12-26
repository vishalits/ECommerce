import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css'],
})
export class CartIconComponent implements OnInit, OnDestroy {
  itemsInCart: number = 0;

  cartSubs!: Subscription;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartSubs = this.cartService.getCart().subscribe((resp: any) => {
      this.itemsInCart = Object.keys(resp).length;
    });
  }

  ngOnDestroy() {
    this.cartSubs.unsubscribe();
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  displayBadge() {
    return this.itemsInCart ? false : true;
  }

  badgeQuantity() {
    return this.itemsInCart > 99 ? '...' : this.itemsInCart;
  }
}
