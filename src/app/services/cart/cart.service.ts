import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { AuthServices } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: any = {};
  cartObservable = new BehaviorSubject({});
  constructor(private fs: Firestore, private authService: AuthServices) {}

  AddToCart(pId: any) {
    this.cart[pId] = 1;
    console.log(pId + ' added to cart');
    this.cartObservable.next(this.cart);
  }

  cartOperations(pId: string, operation: string) {
    if (operation === '+') {
      this.cart[pId] += 1;
      console.log(pId + ' count increased');
    } else {
      this.cart[pId] === 1 ? delete this.cart[pId] : (this.cart[pId] -= 1);
      console.log(pId + ' count decreased');
    }
    this.cartObservable.next(this.cart);
  }

  getCart() {
    console.log('cart info requested');
    return this.cartObservable;
  }

  clearCart() {
    this.cart = {};
    this.cartObservable.next({});
  }

  checkOut(orderInfo: any) {
    const addressDetails = orderInfo.address;
    const paymentDetails = orderInfo.cardInfo;
    const cartDetails = this.cart;
    const date = new Date();
    const orderDate =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    const userInfo: any = {};
    this.authService.user.pipe(take(1)).subscribe((resp) => {
      userInfo.email = resp.email;
      userInfo.id = resp.id;
    });
    const id: string = doc(collection(this.fs, 'id')).id;
    const orderObject = {
      orderId: id,
      addressDetails: JSON.stringify(addressDetails),
      paymentDetails: JSON.stringify(paymentDetails),
      cartDetails: JSON.stringify(cartDetails),
      userInfo: JSON.stringify(userInfo),
      status: 'processing',
      orderDate: orderDate,
    };
    console.log(orderObject);
    const docRef = doc(this.fs, `orders/${id}`);
    return setDoc(docRef, orderObject);
  }
}
