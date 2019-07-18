import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(private http: HttpClient, private catService: CategoriesService, private productService: ProductsService) { }
  newProduct: FormGroup;

  categories = [];
  ngOnInit() {
    this.newProduct = new FormGroup({
      name: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      sku: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      stock: new FormControl(null, Validators.required),
      stockAvailability: new FormControl(null, Validators.required),
    });
    this.catService.getCategoriesByName().subscribe(categories => {
      this.categories = categories;
    });

  }

  onSubmit() {
    console.log(this.newProduct.value);
    this.productService.createProduct(this.newProduct.value).subscribe(response => {
      console.log(response);
    });
  }
}
