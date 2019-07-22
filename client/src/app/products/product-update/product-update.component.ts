import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  error: string;
  productId: any;
  success: string;

  constructor(private productService: ProductsService, private catService: CategoriesService,
    // tslint:disable-next-line: align
    private route: ActivatedRoute) { }
  productValidationMessages = {
    name: [
      { type: 'required', message: 'Required' },
      { type: 'minlength', message: 'must write atleast 5 chars' },
    ],
    categoryId: [
      { type: 'required', message: 'select a suitable category for the product' }
    ],
    description: [
      { type: 'required', message: 'Required' },
      { type: 'minlength', message: 'must write atleast 25 chars' },
    ],
    sku: [
      { type: 'required', message: 'Required' },
      { type: 'pattern', message: 'Should be Number' },
      { type: 'minlength', message: 'must write atleast 5 chars' },
    ],
    imagePath: [
      { type: 'required', message: 'Image is required for promotion' }
    ],
    price: [
      { type: 'required', message: 'required' },
      { type: 'pattern', message: 'Should be Number' }
    ],
    stock: [
      { type: 'required', message: 'required' },
      { type: 'pattern', message: 'Should be Number' },
    ],
    stockAvailability: [
      { type: 'required', message: 'required' }
    ],
  };
  updateProduct: FormGroup;
  productImage: string;
  categories = [];
  ngOnInit() {
    this.updateProduct = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      sku: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      price: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      stock: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      stockAvailability: new FormControl(null, Validators.required),
    });
    this.catService.getCategoriesByName().subscribe(categories => {
      this.categories = categories;
    });
    this.route.params.subscribe(params => {

      this.productService.getProductById(params.id).subscribe(res => {
        this.productId = params.id;
        console.log(res, String(res.price), String(res.stock), res.stockAvailability);
        this.productImage = res.imagePath;
        this.updateProduct.patchValue({
          name: res.name,
          categoryId: res.categoryId,
          description: res.description,
          sku: res.sku,
          price: res.price,
          stock: String(res.stock),
          stockAvailability: res.stockAvailability,
        });
      });
    });
  }

  onSubmit() {
    console.log(this.updateProduct.value);
    console.log(this.productId);
    if (this.updateProduct.invalid) {
      return this.error = 'Must fill all values';
    }
    this.productService.updateProduct(this.productId, this.updateProduct.value).subscribe(res => {
      this.success = 'Product Updated Successfully';
      console.log(res);

    },
      err => {
        console.log(err);
        if (err.message.includes('Unknown')) {
          this.error = 'Something went wrong';
        } else {
          this.error = err.error.message;
        }
      });

  }

}
