import { Injectable } from '@angular/core';
import {
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { Color } from './color';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ColorsService {
  constructor(private fs: Firestore) {}
  colors: any = '';

  addColor(color: Color) {
    color.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'colors'), color);
  }

  getColors(): Observable<Color[]> {
    let colorsReference = collection(this.fs, 'colors');
    return collectionData(colorsReference, { idField: 'id' }) as Observable<
      Color[]
    >;
  }

  deleteColor(color: Color) {
    let colorsReference = doc(this.fs, `colors/${color.id}`);
    return deleteDoc(colorsReference);
  }

  updateColor(color: Color) {
    let colorsReference = doc(this.fs, `colors/${color.id}`);
    return updateDoc(colorsReference, { code: color.code });
  }
}
