import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CategoriesService } from '../services/categories.service';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  categoryId = null;
  updateForm: FormGroup;
  constructor(private http: HttpClient, private catService: CategoriesService, private router: Router) { }
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
      id: new FormControl(null),
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
    this.categoryId = id;
    this.catService.getCategoryById(id).subscribe((res) => {
      console.log(res);
      this.updateForm.patchValue({
        name: res.name,
        file: res.file,
        description: res.description
      });
    });
  }

  onSubmit() {
    console.log(this.updateForm.value);
    this.catService.updateCategory(this.categoryId, this.updateForm.value).subscribe(res => {
      console.log(res);
    });
    console.log('form updated');
  }

  deleteCategory(id: number) {
    const decision = confirm('Are you sure you want to delete?');
    if (decision) {
      this.catService.deleteCategory(id).subscribe(res => {
        console.log(res);
      });
    } else {
      console.log('Nothing has changed');
    }
  }
}
