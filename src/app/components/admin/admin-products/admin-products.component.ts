import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductsService } from 'src/app/services/admin/admin-products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/services/products/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  availableProducts: any;
  localProductList: Product[] = [];
  category: string | null = null;
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private productService: AdminProductsService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((resp) => {
      this.localProductList = resp;
      this.route.queryParamMap.subscribe((params) => {
        let category = params.get('category');
        if (category) {
          console.log(category);
          this.availableProducts = this.localProductList.filter(
            (prod: any) => prod.category === category
          );
        } else {
          this.availableProducts = [...this.localProductList];
        }
      });
    });
  }

  goToForm(id: any) {
    this.router.navigate([id], { relativeTo: this.route });
  }

  deleteProduct(productId: string) {
    this.productService
      .deleteProduct(productId)
      .then(() => {
        this.triggerSnackBar('Product Deleted');
      })
      .catch(() => {
        this.triggerSnackBar('You are not allowed to delete This');
      });
  }

  triggerSnackBar(message: any) {
    this._snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }

  search(query: string) {
    this.availableProducts = query
      ? this.localProductList.filter((prod: Product) =>
          prod.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.localProductList;
  }

  changeCategory(categoryToFilterBy: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams:
        categoryToFilterBy === 'clear' ? {} : { category: categoryToFilterBy },
    });
  }
}
