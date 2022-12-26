import { HttpClient } from '@angular/common/http';
import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { Observable, throwError } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthServices } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Product } from '../products/product';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminProductsService {
  constructor(
    private fs: Firestore,
    private http: HttpClient,
    private authService: AuthServices
  ) {}
  getAllProducts() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get(
          'https://the-tech-shop-default-rtdb.firebaseio.com/products.json?auth=' +
            user.token
        );
      })
    );
  }
  addNewProduct(product: Product) {
    product.id = doc(collection(this.fs, 'products')).id;
    return addDoc(collection(this.fs, 'products'), product);
  }

  updateProduct(product: Product, id: string) {
    let userId: string;
    this.authService.user.pipe(take(1)).subscribe((userData: User) => {
      userId = userData.id;
    });

    return new Promise((resolve, reject) => {
      if (userId === environment.admin.id) {
        let productReference = doc(this.fs, `products/${id}`);
        resolve(updateDoc(productReference, { ...product }));
      } else {
        reject(throwError(() => new Error('user not validated')));
      }
    });
  }

  getProducts(): Observable<Product[]> {
    //using firebase apis
    let productReference = collection(this.fs, 'products');
    return collectionData(productReference, { idField: 'id' }) as Observable<
      Product[]
    >;
  }
  async getProductById(id: string) {
    const productRef = doc(this.fs, 'products', id);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      return productSnap.data();
    } else {
      return undefined;
    }
  }

  deleteProduct(productId: string) {
    let id: string = '';

    this.authService.user.pipe(take(1)).subscribe((userData: User) => {
      id = userData.id;
    });

    return new Promise((resolve, reject) => {
      if (id === environment.admin.id) {
        let productReference = doc(this.fs, `products/${productId}`);
        resolve(deleteDoc(productReference));
      } else {
        reject(throwError(() => new Error('user not validated')));
      }
    });
  }
}
