import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Subject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';


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
  categoryImage: string;
  error: any;
  success: string;
  constructor(private catService: CategoriesService) { }
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
      imagePath: new FormControl(null),
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
      this.categoryImage = res.imagePath;
      this.updateForm.patchValue({
        name: res.name,
        imagePath: res.imagePath,
        description: res.description
      });
    });
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return this.error = 'Must fill all values';
    }
    this.catService.updateCategory(this.categoryId, this.updateForm.value).subscribe(res => {
      this.success = 'Category Updated Successfully';
    }, err => {
      this.error = err.error.error.sqlMessage;
    });
    console.log('form updated');
  }

  deleteCategory(id: number) {
    const decision = confirm('Are you sure you want to delete?');
    if (decision) {
      this.catService.deleteCategory(id).subscribe(res => {
        this.success = 'Category Deleted Successfully';

      }, err => {
        this.error = err.error.error.sqlMessage;
      });
    } else {
      console.log('Nothing has changed');
    }
  }
}
