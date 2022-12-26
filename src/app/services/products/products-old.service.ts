import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServices } from '../auth/auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsOldService {
  constructor(private http: HttpClient, private authService: AuthServices) {}
  colors: any = '';
  getProducts() {
    //we're using exhaust map because we can't return an observable form another observable
    //that's why we are combining them into a big observable
    // so to do the following
    // return this.authService.user.pipe(take(1)).subscribe((user) => {
    //   return this.http.get(
    //     'https://the-tech-shop-default-rtdb.firebaseio.com/colors.json'
    //   );
    // });

    //we'll have to do some thing like this
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // exhaust map will wait for the firat observable to finish and
        // then pass that as arument to second and replace the first observable as a whole
        // with the returned observable from the callback function
        return this.http.get(
          // in firebase to supply token you use it as query parameter while in other apis you send it as header
          'https://the-tech-shop-default-rtdb.firebaseio.com/colors.json?auth=' +
            user.token
        );
      })
    );
  }
}
