import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { UploadImageService } from 'src/app/services/upload-image.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  isSubmitted: boolean = false;
  isSuccessful: boolean = true;
  imagePath:string="../../assets/Images/"
  imgString:string=""
  file: File | null = null;
  addCategoryForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private uploadImageService: UploadImageService,
    private categoryService: CategoryService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      categoryName: [null, [Validators.required]],
      categoryImage: [null, [Validators.required]],
    });
  }
  onSubmit() {
    this.isSubmitted = true;
   
     this.imgString=(this.addCategoryForm.controls['categoryImage'].value).toString()
     const splitArray = this.imgString.split('\\');
     this.imagePath+=splitArray[splitArray.length-1]
        this.categoryService
          .addCategory(
            this.addCategoryForm.controls['categoryName'].value,
            this.imagePath
          )
          .subscribe({
            next: (data) => {
              if(data==true)
              {
                this.isSuccessful=true;
                this.router.navigate(["home"])
              }
              console.log(data);
            },
            error: (err) => {
              this.isSuccessful=false
              console.log(err) 
            }
          });
      }
 
  get f(): { [controlName: string]: AbstractControl } {
    return this.addCategoryForm.controls;
  }
  onSelectingImage(event: any) {
    this.file = event.target.files[0];
  }
}