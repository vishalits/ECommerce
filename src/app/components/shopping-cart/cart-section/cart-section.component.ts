import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { Product } from 'src/app/services/products/product';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-cart-section',
  templateUrl: './cart-section.component.html',
  styleUrls: ['./cart-section.component.css'],
})
export class CartSectionComponent implements OnInit, OnDestroy {
  cartSubs!: Subscription;
  prodSubs!: Subscription;

  cartProductsList: any[] = [];
  allProducts: Product[] = [];

  totalAmount: number = 0;
  gst: number = 0;
  deliveryCharge: number = 0;
  payableAmount: number = 0;

  constructor(
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.prodSubs = this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((resp: Product[]) => {
        this.allProducts = resp;
        this.cartSubs = this.cartService.getCart().subscribe((resp: any) => {
          this.cartProductsList = this.transformData(resp);
        });
      });
  }

  ngOnDestroy() {
    this.cartSubs.unsubscribe();
  }
  showlist() {
    console.table(this.cartProductsList);
  }

  modifyCart(id: string, payload: string) {
    this.cartService.cartOperations(id, payload);
  }

  transformData(resp: any) {
    if (!resp) return [];
    let newList: any[] = [];
    let localTotalAmount = 0;
    this.allProducts.forEach((prodInfo) => {
      let id = prodInfo.id ? prodInfo.id : '';
      if (Object.keys(resp).includes(id)) {
        let prodCount = resp[id];
        let currTotal = +prodInfo.price * prodCount;
        newList.push({
          ...prodInfo,
          count: prodCount,
          total: currTotal,
        });
        localTotalAmount += currTotal;
      }
    });
    this.totalAmount = localTotalAmount;
    this.deliveryCharge = localTotalAmount ? 80 : 0;
    this.gst = Math.floor(18 * (this.totalAmount / 100));
    this.payableAmount = this.gst + this.totalAmount + this.deliveryCharge;
    return newList;
  }
}
