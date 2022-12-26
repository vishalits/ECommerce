import { Location } from '@angular/common';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderServiceService } from 'src/app/services/order/order-service.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css'],
})
export class FeedbackModalComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private orderService: OrderServiceService
  ) {}
  localRating: number = 0;
  filledStars: number = 0;
  @Input('orderId') orderId: string = '';
  @Output('closeModal') closeModal = new EventEmitter();
  @Output('reloadParent') reloadParent = new EventEmitter();

  ngOnInit(): void {
    console.log(this.orderId);
  }
  setRating(hoverStarNumber: number) {
    this.localRating = hoverStarNumber;
  }
  setFilledStar(stars: number) {
    this.filledStars = stars;
  }
  clearFilledStar() {
    this.filledStars = 0;
  }
  sendRating() {
    this.orderService
      .sendRating(this.orderId, this.localRating)
      .then((resp) => this.triggerSnackBar('Purchase rated, Thanks'))
      .catch((err) => this.triggerSnackBar('Unknown Error Occurred'))
      .finally(() => {
        this.reloadParent.emit();
      });
  }

  setStarType(starNumber: number) {
    let fillby: number = this.localRating ? this.localRating : this.filledStars;
    return starNumber <= fillby ? 'bi-star-fill' : 'bi-star';
  }
  triggerSnackBar(message: any) {
    this._snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }

  modalCloseHandler() {
    this.closeModal.emit();
  }
}
