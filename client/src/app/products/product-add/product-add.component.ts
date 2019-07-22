import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private catService: CategoriesService, private productService: ProductsService) { }
  selectedFile: File;
  error = null;
  success = null;
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
    stockAvailability: [
      { type: 'required', message: 'required' }
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
      stockAvailability: new FormControl(null, Validators.required),
    });
    this.catService.getCategoriesByName().subscribe(categories => {
      this.categories = categories;
    });

  }

  onSubmit() {
    if (this.newProduct.invalid) {
      return this.error = 'Must fill all values';
    }
    console.log(this.newProduct.value);
    const uploadData = new FormData();
    uploadData.append('productImage', this.selectedFile, this.selectedFile.name);
    uploadData.append('name', this.newProduct.get('name').value);
    uploadData.append('categoryId', this.newProduct.get('categoryId').value);
    uploadData.append('description', this.newProduct.get('description').value);
    uploadData.append('sku', this.newProduct.get('sku').value);
    uploadData.append('price', this.newProduct.get('price').value);
    uploadData.append('stock', this.newProduct.get('stock').value);
    uploadData.append('stockAvailability', this.newProduct.get('stockAvailability').value);

    this.productService.createProduct(uploadData).subscribe(res => {
      this.success = 'Product added Successfully';
    },
      err => {
        console.log(err);
        if (err.message.includes('Unknown')) {
          this.error = 'Something went wrong';
        } else {
          this.error = err.error.message;
        }
      }
    );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
