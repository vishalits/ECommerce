import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductsService } from 'src/app/services/admin/admin-products.service';
import { CategoryService } from 'src/app/services/products/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories: any;
  currentProduct: any = {
    title: '',
    price: '',
    category: '',
    imageUrl: '',
  };
  private newProduct: boolean = true;
  id: string = '';
  constructor(
    private _snackBar: MatSnackBar,
    private categoryServices: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: AdminProductsService
  ) {
    //getting categories
    this.categories = [];
    this.categoryServices.getCategories().subscribe((resp) => {
      this.categories = resp;
    });

    //getting query param
    this.id = this.route.snapshot.paramMap.get('product-id') || '';

    if (this.id !== 'new') {
      this.newProduct = false;
      productService.getProductById(this.id).then((resp) => {
        if (resp) {
          this.currentProduct = resp;
        } else {
          console.log('Product Not Found');
        }
      });
    }
  }

  ngOnInit(): void {}

  save(form: any) {
    this.handleProductUpdation(form)
      .then(() => {
        this.router.navigate(['/admin/products']);
      })
      .catch((err) => this.triggerSnackBar('You cannot edit this 😎'));
  }

  handleProductUpdation(form: any) {
    if (this.newProduct) {
      return this.productService.addNewProduct(form);
    } else {
      return this.productService.updateProduct(form, this.id);
    }
  }

  triggerSnackBar(message: any) {
    this._snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
