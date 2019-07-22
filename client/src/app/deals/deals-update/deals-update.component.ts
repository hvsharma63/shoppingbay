import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DealsService } from 'src/app/services/deals.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deals-update',
  templateUrl: './deals-update.component.html',
  styleUrls: ['./deals-update.component.css']
})
export class DealsUpdateComponent implements OnInit {
  error: string;
  dealId: any;
  success: string;

  constructor(private datePipe: DatePipe, private dealsService: DealsService, private route: ActivatedRoute) { }
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
  updateDeal: FormGroup;
  products = [];
  ngOnInit() {
    this.updateDeal = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      productId: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      discount: new FormControl(null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    });
    this.dealsService.getAllProductNamesForDeals().subscribe(products => {
      this.products = products;
    });
    this.route.params.subscribe(params => {
      this.dealsService.getDealById(params.id).subscribe(res => {
        this.dealId = params.id;
        console.log(res);

        this.updateDeal.patchValue({
          name: res.name,
          productId: res.productId,
          startDate: this.datePipe.transform(res.startDate, 'yyyy-MM-dd'),
          endDate: this.datePipe.transform(res.endDate, 'yyyy-MM-dd'),
          discount: res.discount,
        });
      });
    });
  }

  onSubmit() {
    if (this.updateDeal.invalid) {
      return this.error = 'Must fill all values';
    }
    this.dealsService.updateDeal(this.dealId, this.updateDeal.value).subscribe(res => {
      console.log(res);
      this.success = 'Category Updated Successfully';
    }, err => {
      this.error = err.error.error.sqlMessage;
    });
    console.log('form updated');
  }


}
