import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  errorMsg: string = '';
  constructor() {}

  isValid(userInfo: any) {
    // validating address information
    for (let i = 0; i < userInfo.address.name.length; i++) {
      let chr = userInfo.address.name[i];
      if (this.isdigit(chr)) {
        this.setError('Invalid name, it cannot contain numbers');
        return false;
      }
    }

    if (!this.isdigit(userInfo.address.phone)) {
      this.setError('Invalid Phone Number, it must be a number');
      return false;
    }
    if (userInfo.address.phone.length !== 10) {
      this.setError('Phone Number should be of exactly 10 digits');
      return false;
    }
    if (!this.isdigit(userInfo.address.pincode)) {
      this.setError('Invalid Pincode, it must be a number');
      return false;
    }
    if (
      userInfo.address.pincode.length !== 6 ||
      +userInfo.address.pincode < 100000
    ) {
      this.setError('Pincode should be of exactly 6 digits');
      return false;
    }

    // validating cardInfo info
    if (!this.isdigit(userInfo.cardInfo.cardNumber)) {
      this.setError('Invalid Card Number, it must be a number');
      return false;
    }
    if (userInfo.cardInfo.cardNumber.length !== 12) {
      this.setError('Card Number should be of exactly 12 digits');
      return false;
    }

    const currDate: Date = new Date();
    const enteredDate: Date = new Date(userInfo.cardInfo.expiry);
    if (enteredDate <= currDate) {
      this.setError('Card is expired');
      return false;
    }
    // const expiresIn = enteredDate.getFullYear() - currDate.getFullYear();

    // if (userInfo.cardInfo.expiry.length !== 6) {
    //   this.setError('Pincode should be of exactly 6 digits');
    //   return false;
    // }

    for (let i = 0; i < userInfo.cardInfo.cardHolder.length; i++) {
      let chr = userInfo.cardInfo.cardHolder[i];
      if (this.isdigit(chr)) {
        this.setError('Invalid card holder name, it cannot contain numbers');
        return false;
      }
    }
    if (!this.isdigit(userInfo.cardInfo.cvv)) {
      this.setError('Invalid CVV, it must be a number');
      return false;
    }
    if (userInfo.cardInfo.cvv.length !== 3 || +userInfo.cardInfo.cvv < 100) {
      this.setError('CVV should be of exactly 3 digits');
      return false;
    }
    return true;
  }

  isdigit(string: string) {
    return string.length && !/\D/.test(string);
  }

  setError(msg: string) {
    this.errorMsg = msg;
  }

  clearError() {
    this.errorMsg = '';
  }
}
