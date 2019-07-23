import { Component, OnInit, OnDestroy } from '@angular/core';
import { DealsService } from 'src/app/services/deals.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-deals-index',
  templateUrl: './deals-index.component.html',
  styleUrls: ['./deals-index.component.css']
})
export class DealsIndexComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  success: string;
  constructor(private dealsService: DealsService) { }

  deals = [];
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.dealsService.getAllDeals().subscribe(res => {
      this.deals = res;
      this.dtTrigger.next();
    });
  }

  deleteDeal(id: number) {
    this.dealsService.deleteDeal(id).subscribe(res => {

      this.success = 'Deal Deleted Successfully';
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
