import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore';
import { take } from 'rxjs';
import { AuthServices } from '../auth/auth.service';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root',
})
export class OrderServiceService {
  orderArray: any[] = [];
  constructor(
    private productService: ProductsService,
    private fs: Firestore,
    private authService: AuthServices
  ) {}

  sendRating(id: string, rating: number) {
    const docRef = doc(this.fs, `orders/${id}`);
    const data = { rating: rating };
    return setDoc(docRef, data, { merge: true });
  }

  getUserOrders() {
    let productList: any[] = [];
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((resp) => {
        productList = resp;
        this.authService.user.pipe(take(1)).subscribe(async (resp: any) => {
          const userInfo = { email: resp.email, id: resp.id };
          // Create a reference to the cities collection
          const orderRef = collection(this.fs, 'orders');
          // Create a query against the collection.
          const q = query(
            orderRef,
            where('userInfo', '==', JSON.stringify(userInfo))
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const docData = doc.data();
            let { orderDate, orderId, status, cartDetails } = docData;
            let rating = docData['rating'];
            let productsTitleArray: any[] = [];
            cartDetails = JSON.parse(cartDetails);
            Object.keys(cartDetails).forEach((prodId: any) => {
              productsTitleArray.push(
                productList.filter((p) => p.id === prodId)[0].title
              );
            });

            this.orderArray.push({
              orderDate,
              orderId,
              status,
              productsTitleArray,
              rating: rating ? rating : 0,
            });
          });

          this.orderByDate();
        });
      });

    return this.orderArray;
  }

  orderByDate() {
    this.orderArray.sort((currOrderId, nextOrderId) => {
      console.log(currOrderId, nextOrderId);
      let currOrderDate = currOrderId.orderDate;
      let nextOrderDate = nextOrderId.orderDate;
      let currDateArr = currOrderDate.split('-');
      let nextDateArr = nextOrderDate.split('-');
      const currDateInstance = new Date(
        `${currDateArr[1]}-${currDateArr[0]}-${currDateArr[2]}`
      );
      const nextDateInstance = new Date(
        `${nextDateArr[1]}-${nextDateArr[0]}-${nextDateArr[2]}`
      );
      let diff = nextDateInstance.getTime() - currDateInstance.getTime();
      return diff;
    });
  }
}
