import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  constructor(private catService: CategoriesService, private router: Router) { }
  selectedFile: File;
  error = null;
  success = null;
  categoryAdd: FormGroup;
  categoryValidationMessages = {
    name: [
      { type: 'required', message: 'Required' },
    ],
    description: [
      { type: 'required', message: 'Required' },
      { type: 'minlength', message: 'must write atleast 25 chars' },
    ],
    imagePath: [
      { type: 'required', message: 'Image is required for promotion' }
    ]
  };
  ngOnInit() {
    this.categoryAdd = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.minLength(25)]),
      imagePath: new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    if (this.categoryAdd.invalid) {
      return this.error = 'Must fill all values';
    }
    const uploadData = new FormData();
    uploadData.append('categoryImage', this.selectedFile, this.selectedFile.name);
    uploadData.append('name', this.categoryAdd.get('name').value);
    uploadData.append('description', this.categoryAdd.get('description').value);
    uploadData.append('imagePath', this.categoryAdd.get('imagePath').value);

    this.catService.createCategory(uploadData).subscribe(res => {
      this.success = 'Category created Successfully';
    },
      err => {
        console.log(err);
        if (err.message.includes('Unknown')) {
          this.error = 'Something went wrong';
        } else {
          this.error = err.error.message;
        }
      });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
