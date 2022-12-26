import { Injectable, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class ProductsService implements OnInit {
  constructor(private fs: Firestore) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): Observable<Product[]> {
    let productsReference = collection(this.fs, 'products');
    return collectionData(productsReference, { idField: 'id' }) as Observable<
      Product[]
    >;
  }
}
