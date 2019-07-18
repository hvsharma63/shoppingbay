import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private productService: ProductsService, private catService: CategoriesService,
    // tslint:disable-next-line: align
    private route: ActivatedRoute) { }

  updateProduct: FormGroup;
  categories = [];
  ngOnInit() {
    this.updateProduct = new FormGroup({
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
    this.route.params.subscribe(params => {
      console.log(params.id);
    });
  }

  onSubmit() {
    console.log(this.updateProduct.value);
    // this.productService.updateProduct(this.updateProduct.value).subscribe(response => {
    //   console.log(response);
    // });
  }

}
