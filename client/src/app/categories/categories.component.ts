import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CategoriesService } from '../services/categories.service';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  categories: object;
  dtTrigger = new Subject();

  updateForm: FormGroup;
  constructor(private http: HttpClient, private catService: CategoriesService) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.catService.getAllCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.dtTrigger.next();
      });

    this.updateForm = new FormGroup({
      name: new FormControl(null),
      file: new FormControl(null),
      description: new FormControl(null),
    });
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  getCategoryDetails(id: number) {
    this.catService.getCategoryById(id).subscribe((res) => {
      console.log(res);
      this.updateForm.patchValue({
        name: res.name.toString(),
        file: res.file,
        description: res.description
      });
    });
  }

  updateCategory() {
    console.log('form updated');

  }
}
