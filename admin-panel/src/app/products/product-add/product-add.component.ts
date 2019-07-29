import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  endDate: string;

  constructor(private catService: CategoriesService, private productService: ProductsService, private router: Router) { }
  isProductInDeal = false;
  selectedFile: File;
  error = null;
  success = null;
  startDate = null;
  newProduct: FormGroup;
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
      { type: 'pattern', message: 'Should be Decimal Number' },
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
      { type: 'pattern', message: 'Should be Decimal Number' },
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
  categories = [];
  ngOnInit() {
    this.newProduct = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      categoryId: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      sku: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      imagePath: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      stock: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      startDate: new FormControl(null, [this.validateStartDate.bind(this)]),
      endDate: new FormControl(null, [this.validateEndDate.bind(this)]),
      discount: new FormControl(null, [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    });
    this.catService.getCategoriesByName().subscribe(categories => {
      this.categories = categories;
    });

  }

  onSubmit() {
    if (this.newProduct.invalid) {
      return this.error = 'Must fill all values';
    }
    console.log(this.newProduct.get('startDate').value == null);
    console.log(this.newProduct.get('endDate').value == null);
    console.log(this.newProduct.get('discount').value == null);
    const uploadData = new FormData();
    //   if (this.newProduct.get('startDate').value == null ||
    //   this.newProduct.get('endDate').value == null ||
    //   this.newProduct.get('discount').value == null) {
    //   console.log(this.newProduct.get('startDate').value == null);
    //   console.log(this.newProduct.get('endDate').value == null);
    //   console.log(this.newProduct.get('discount').value == null);

    //   uploadData.append('startDate', null);
    //   uploadData.append('endDate', null);
    //   uploadData.append('discount', null);
    // }
    uploadData.append('productImage', this.selectedFile, this.selectedFile.name);
    uploadData.append('name', this.newProduct.get('name').value);
    uploadData.append('categoryId', this.newProduct.get('categoryId').value);
    uploadData.append('description', this.newProduct.get('description').value);
    uploadData.append('sku', this.newProduct.get('sku').value);
    uploadData.append('price', this.newProduct.get('price').value);
    uploadData.append('stock', this.newProduct.get('stock').value);
    uploadData.append('startDate', this.newProduct.get('startDate').value);
    uploadData.append('endDate', this.newProduct.get('endDate').value);
    uploadData.append('discount', this.newProduct.get('discount').value);
    this.productService.createProduct(uploadData).subscribe(res => {
      console.log(res);
      this.success = res.message;
    }, err => {
      console.log(err);
      if (err.message.includes('Unknown')) {
        this.error = 'Something went wrong';
      } else {
        this.error = err.error.message;
      }
    }
    );
  }
  getStartDate(date: string) {
    console.log(date);
    this.startDate = date;
  }

  getEndDate(date: string) {
    console.log(date);
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
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
