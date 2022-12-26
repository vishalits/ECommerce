import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { AuthServices } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'bs-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  private userSub: Subscription | null = null;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  constructor(private authService: AuthServices) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
      this.isAdmin = user.isAdmin ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  logOutHandler() {
    this.authService.logOut();
  }
}
