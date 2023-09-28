import { Component, OnInit, OnDestroy ,NgModule} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchingValidation } from '../shared/match-validator';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  formValid: boolean = true;
  formatedDate : string = "";
  sub$?: Subscription;
  statusCode?: number;
  isSuccessful:Boolean=true;
  duplicateStatus ? : boolean
  submitted: boolean = false;
  mobileNoRegex: string = '^[0-9]*$';
  emailRegex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  userType: string = '';
 
  constructor(private service: AccountService, private fb: FormBuilder,private datePipe: DatePipe, private router: Router) { }
 
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      gender: ['',Validators.required],
      // contactNo: [null, [Validators.required, Validators.min(10), Validators.max(10), Validators.pattern(this.mobileNoRegex)]],
      contactNo: [null, [Validators.required, Validators.pattern(this.mobileNoRegex)]],
 
      emailId: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      confirmPassword: [null, Validators.required],
      // dateOfBirth: [null, [Validators.required, this.validateDateOfBirth]],
      dateOfBirth: [null, [Validators.required]],
 
    }, { validators: MatchingValidation('password', 'confirmPassword') });
  }
 
  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }
 
  public ChangeDateFormat(date: string): string {
    if (!date) {
      return ''; // Return an empty string if the input date is empty or falsy
    }
    const parsedDate = new Date(date);
    return this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || '';
  }
 
  onSubmit(): void {
    this.submitted = true;
    // console.log(this.registerForm.valid);
    // console.log(this.registerForm.value);
    // console.log(this.f['firstName'].value);
    // console.log(this.f['lastName'].value);
    // console.log(this.f['gender'].value);
    // console.log(this.f['contactNo'].value);
    // console.log(this.f['emailId'].value);
    // console.log(this.f['password'].value);
    // console.log(this.f['dateOfBirth'].value);
 
    // Date dt = new Date(this.ChangeDateFormat(this.f['dateOfBirth'].value));
    console.log(this.registerForm.valid);
    console.log(this.registerForm.value);
 
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.sub$ = this.service.Register(
        this.f['firstName'].value,
        this.f['lastName'].value,
 
        this.f['gender'].value,
        new Date(this.ChangeDateFormat(this.f['dateOfBirth'].value)),
        this.f['contactNo'].value,
        this.f['emailId'].value,
        this.f['password'].value,
 
      ).subscribe({
        next: (data) => {
          this.router.navigate(["/login"]);
          // console.log(data);
          // sessionStorage.setItem("token", data.access_token);
        },
        error: (err) => {
          this.isSuccessful=false;
          console.error(err.status);
          console.log(err)
          alert(err);
          this.statusCode = err.status;
          console.log("Status Codr is ", this.statusCode);
          //this.duplicateStatus = true;
        }
      });
 
      this.formValid = true;
    }
  }
 
  getControl(key: string): AbstractControl {
    return this.registerForm.get(key) as AbstractControl;
  }
 
  get f(): { [controlName: string]: AbstractControl } {
    return this.registerForm.controls;
  }
 
  //  phoneNumberValidator(control:AbstractControl) {
  //   const value = control.value;
  //   if (value && value.toString().length < 10) {
  //     return { invalidNumber: true };
  //   }
  //   return null;
  // }
  // validateDateOfBirth(control: AbstractControl) {
  //   const selectedDate = new Date(control.value);
  //   const currentDate = new Date();
  //   const age = currentDate.getFullYear() - selectedDate.getFullYear();
 
  //   if (age >= 18 && age <= 100) {
  //     return null;
  //   } else {
  //     return { invalidDateOfBirth: true };
  //   }
  // }
}