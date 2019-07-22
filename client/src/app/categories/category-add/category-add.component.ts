import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  constructor(private catService: CategoriesService, private formBuilder: FormBuilder) { }

  categoryAdd: FormGroup;
  selectedFile: File;

  ngOnInit() {
    this.categoryAdd = new FormGroup({
      name: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const uploadData = new FormData();
    uploadData.append('categoryImage', this.selectedFile, this.selectedFile.name);
    this.catService.createCategory(uploadData,this.categoryAdd.value).subscribe(res=>{
      console.log(res);
    })
  }

}
