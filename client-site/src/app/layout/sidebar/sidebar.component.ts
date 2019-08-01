import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {

  }

  getFilterOption(value: string) {
    this.productService.shareFilteredOption(value);
  }

  getDisplayOption(value: string) {
    this.productService.shareDisplayOption(value);
  }
}
