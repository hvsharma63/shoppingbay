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
  startDate: string;
  endDate: string;

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
    startDate: [
      { type: 'match', message: 'Start Date cannot be ahead of End Date' },
    ],
    endDate: [
      { type: 'match', message: 'End Date cannot be in advance of Start Date' },
    ],
    discount: [
      { type: 'pattern', message: 'Should be Number' }
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
      imagePath: new FormControl(null),
      price: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      stock: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      startDate: new FormControl(null, [this.validateStartDate.bind(this)]),
      endDate: new FormControl(null, [this.validateEndDate.bind(this)]),
      discount: new FormControl(null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    });
    this.catService.getCategoriesByName().subscribe(categories => {
      this.categories = categories;
    });
    this.route.params.subscribe(params => {

      this.productService.getProductById(params.id).subscribe(res => {
        this.productId = params.id;
        this.productImage = res.imagePath;
        console.log(res);
        this.updateProduct.patchValue({
          name: res.name,
          categoryId: res.categoryId,
          description: res.description,
          sku: res.sku,
          imagePath: res.imagePath,
          price: res.price,
          stock: String(res.stock),
          discount: res.discount,
          startDate: res.startDate ? res.startDate.split('T')[0] : null,
          endDate: res.endDate ? res.endDate.split('T')[0] : null
        });
      });
    });
  }
  getStartDate(date: string) {
    this.startDate = date;
  }

  getEndDate(date: string) {
    this.endDate = date;
  }

  validateStartDate(control: FormControl): { [s: string]: boolean } {
    if (control.value > this.endDate) {
      return { match: true };
    }
    return null;
  }

  validateEndDate(control: FormControl): { [s: string]: boolean } {
    if (control.value < this.startDate) {
      return { match: true };
    }
    return null;
  }
  onSubmit() {
    if (this.updateProduct.invalid) {
      return this.error = 'Must fill all values';
    }
    console.log(this.updateProduct.value);

    this.productService.updateProduct(this.productId, this.updateProduct.value).subscribe(res => {
      console.log(res);
      this.success = 'Product Updated Successfully';
    },
      err => {
        if (err.message.includes('Unknown')) {
          this.error = 'Something went wrong';
        } else {
          this.error = err.error.error.sqlMessage;
        }
      });

  }

}
