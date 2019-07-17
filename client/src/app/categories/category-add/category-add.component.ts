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
  uploaded = false;
  fileData: any;
  // public uploader: FileUploader = new FileUploader({
  //   url: 'http://localhost:3000/categories/image/upload',
  //   itemAlias: 'photo',
  //   allowedMimeType: [
  //     'image/png',
  //     'image/gif',
  //     'image/jpeg'
  //   ],
  //   queueLimit: 1
  // });
  categoryAdd: FormGroup;
  fileToUpload: File;
  http: any;
  categoryData = new FormData();
  ngOnInit() {
    // console.log(this.uploaded);
    // console.log('called from Category Add');
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    //   alert('File uploaded successfully');
    //   this.uploaded = true;
    //   console.log(this.uploaded);

    // };

    this.categoryAdd = this.formBuilder.group({
      name: [''],
      imagePath: [''],
      description: ['']
    });
  }
  onSubmit() {

    this.categoryData.append('name', this.categoryAdd.get('name').value);    // tslint:disable-next-line: prefer-for-of
    this.categoryData.append('description', this.categoryAdd.get('description').value);    // tslint:disable-next-line: prefer-for-of

    console.log(this.categoryData);
    this.catService.createCategory(this.categoryData)
      .subscribe(res => {
        console.log(res);
      });

  }

  fileProgress(files: FileList) {
    this.fileToUpload = files.item(0);
    this.categoryData.append('imagePath', this.fileToUpload, this.fileToUpload.name);
  }
}
