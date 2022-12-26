import { Component, OnInit } from '@angular/core';
import { AuthServices } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-project';

  constructor(private authService: AuthServices) {}
  ngOnInit() {
    this.authService.autoLogIn();
  }
}
