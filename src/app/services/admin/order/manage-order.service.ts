import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ManageOrderService {
  constructor(private fs: Firestore) {}

  STATUS=['processing', 'delivered','dispatched']

  getOrders() {
    let ordersReference = collection(this.fs, 'orders');
    return collectionData(ordersReference, { idField: 'id' });
  }

  async getOrderById(id: string) {
    const orderRef = doc(this.fs, 'orders', id);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      return orderSnap.data();
    } else {
      return undefined;
    }
  }

  async getFilteredOrders() {
    let q = query(
      collection(this.fs, 'orders'),
      where('id', 'array-contains', [
        '1JXGVElsMznriarkMajL',
        '4Ud09Ru5m3F3f575J4g3',
        '4nFzRukwZYJSvb1YPXan',
      ])
    );
    const docsSnap = await getDocs(q);

    docsSnap.forEach((doc) => {
      console.log(doc.data());
    });
  }

  updateStatus(id: string, status: string) {
    const docRef = doc(this.fs, `orders/${id}`);
    const data = { status: status };
    return setDoc(docRef, data, { merge: true });
  }
}
