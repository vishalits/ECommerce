import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { FormsService } from 'src/app/services/form/forms.service';

@Component({
  selector: 'app-checkout-section',
  templateUrl: './checkout-section.component.html',
  styleUrls: ['./checkout-section.component.css'],
})
export class CheckoutSectionComponent implements OnInit {
  constructor(
    private router: Router,
    private formService: FormsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  loadingState: boolean = false;
  errorMsg: string = '';

  save(form: any) {
    const userInfo = form.value;
    if (this.formService.isValid(userInfo)) {
      this.loadingState = true;
      this.cartService.checkOut(userInfo).then((resp) => {
        console.log(resp);
        this.loadingState = false;
        this.cartService.clearCart();
        this.router.navigate(['/home']);
      });
    } else {
      this.errorMsg = this.formService.errorMsg;
    }
  }
  clearError() {
    this.formService.clearError();
    this.errorMsg = this.formService.errorMsg;
  }
}
