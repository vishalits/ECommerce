import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthServices } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private authService: AuthServices) {}
  getCategories() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get(
          'https://the-tech-shop-default-rtdb.firebaseio.com/categories.json?auth=' +
            user.token
        );
      })
    );
  }
}
