import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderServiceService } from 'src/app/services/order/order-service.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  showOrders: boolean = true;
  showFeedback: boolean = false;
  feedbackOrderId: string = '';
  ordersArray: any[] = [];

  constructor(
    private orderSevice: OrderServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ordersArray = this.orderSevice.getUserOrders();
  }

  toggleFeedback(id: string = '') {
    this.feedbackOrderId = id;
    this.showFeedback = !this.showFeedback;
  }
  reloadPage() {
    window.location.reload();
  }

  showDetails(orderId:string) {
    this.router.navigate([orderId], { relativeTo: this.route });
  }
}
