import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  displayCart: boolean = false;
  constructor(private location: Location, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartObservable.pipe(take(1)).subscribe((resp) => {
      if (Object.keys(resp).length) {
        this.displayCart = true;
      }
    });
  }

  closeCart() {
    this.location.back();
  }
}
