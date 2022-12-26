import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ManageOrderService } from 'src/app/services/admin/order/manage-order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  dsc: boolean = true;
  loaded: boolean = false;
  availableOrders: any[] = [];
  localOrders: any = {};
  statusParam: any = '';
  ordersFilteredByStatus: any[] = [];
  constructor(
    private orderManagement: ManageOrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('constructor called');
  }

  ngOnInit(): void {
    console.log('onInIt called');
    this.orderManagement.getOrders().subscribe((resp) => {
      resp.forEach((prod: any) => {
        let orderId = prod['orderId'];
        if (this.localOrders[orderId]) {
          //update Status
          this.localOrders[orderId].status = prod['status'];
        } else {
          //fill in new Object
          this.localOrders[orderId] = {
            status: prod['status'],
            orderDate: prod['orderDate'],
          };
        }
      });

      this.route.queryParamMap.subscribe((params) => {
        let tempStatusParam = params.get('status');

        this.statusParam =
          tempStatusParam &&
          this.orderManagement.STATUS.includes(tempStatusParam)
            ? tempStatusParam
            : '';

        if (this.statusParam) {
          this.ordersFilteredByStatus = [];
          Object.keys(this.localOrders).forEach((prodId: any) => {
            if (this.localOrders[prodId].status === this.statusParam) {
              this.ordersFilteredByStatus.push(prodId);
            }
          });
        } else {
          this.ordersFilteredByStatus = [...Object.keys(this.localOrders)];
        }
        this.availableOrders = [...this.ordersFilteredByStatus];
      });

      this.orderByDate();
      this.loaded = true;
    });
  }

  goToOrderDetail(orderId: string) {
    this.router.navigate([orderId], { relativeTo: this.route });
  }
  search(value: string) {
    this.availableOrders = value
      ? this.ordersFilteredByStatus.filter((prodId: any) =>
          prodId.toLowerCase().includes(value.toLowerCase())
        )
      : this.ordersFilteredByStatus;
  }

  changeStatus(statusToFilterBy: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams:
        statusToFilterBy === 'clear' ? {} : { status: statusToFilterBy },
    });
  }

  orderByDate() {
    this.dsc = !this.dsc;
    this.availableOrders.sort((currOrderId, nextOrderId) => {
      console.log(currOrderId, nextOrderId);
      let currOrderDate = this.localOrders[currOrderId].orderDate;
      let nextOrderDate = this.localOrders[nextOrderId].orderDate;
      let currDateArr = currOrderDate.split('-');
      let nextDateArr = nextOrderDate.split('-');
      const currDateInstance = new Date(
        `${currDateArr[1]}-${currDateArr[0]}-${currDateArr[2]}`
      );
      const nextDateInstance = new Date(
        `${nextDateArr[1]}-${nextDateArr[0]}-${nextDateArr[2]}`
      );
      let diff = this.dsc
        ? currDateInstance.getTime() - nextDateInstance.getTime()
        : nextDateInstance.getTime() - currDateInstance.getTime();
      return diff;
    });
    console.log(this.availableOrders);
  }
}
