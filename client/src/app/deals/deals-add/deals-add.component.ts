import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/services/deals.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-deals-add',
  templateUrl: './deals-add.component.html',
  styleUrls: ['./deals-add.component.css']
})
export class DealsAddComponent implements OnInit {
  addDeal: FormGroup;
  error: string;
  success: string;
  constructor(private dealsService: DealsService) { }

  products = [];
  dealsValidationMessages = {
    name: [
      { type: 'required', message: 'Required' },
      { type: 'minlength', message: 'must write atleast 5 chars' },
    ],
    productId: [
      { type: 'required', message: 'select a suitable product for the deal' }
    ],
    startDate: [
      { type: 'required', message: 'Required' },
    ],
    endDate: [
      { type: 'required', message: 'Required' },
    ],
    discount: [
      { type: 'required', message: 'required' },
      { type: 'pattern', message: 'Should be Number' }
    ],
  };
  ngOnInit() {
    this.addDeal = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      productId: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      discount: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    });
    this.dealsService.getAllProductNamesForDeals().subscribe(products => {
      this.products = products;
    });
  }

  onSubmit() {
    if (this.addDeal.invalid) {
      return this.error = 'Must fill all values';
    }
    console.log(this.addDeal.value);
    this.dealsService.createDeal(this.addDeal.value).subscribe(response => {
      this.success = 'Deal created Successfully';
    }, err => {
      this.error = err.error.error.sqlMessage;
    });
  }
}
