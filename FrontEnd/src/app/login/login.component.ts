import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  isRegisterClicked: boolean = false;
  LoginForm!: FormGroup;
  sub$?: Subscription;
  isSuccessful:boolean=true
  submitted: boolean = false;
  emailRegex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor(private accService: AccountService, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({    
      emailId: [null, [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    });
    if(sessionStorage.getItem("token"))
    {
      this.router.navigateByUrl("/home")
    }
  }

  getControl(key: string): AbstractControl {
    return this.LoginForm.get(key) as AbstractControl;
  }

  get f(): { [controlName: string]: AbstractControl } {
    return this.LoginForm.controls;
  }
  onSubmit(): void {
   
    console.log(this.f['emailId'].value);
    console.log(this.f['password'].value);

      this.sub$ = this.accService.Login(
      
        this.f['emailId'].value,
        this.f['password'].value,
              
      ).subscribe({
        next: (data) => {
          console.log(data);
          sessionStorage.setItem("token", data.access_token);
          
        },
        error: (err) => {
          console.error(err.status);
          this.isSuccessful=false;
          this.shake();
          // this.statusCode = err.status;
          // console.log("Status Codr is ", this.statusCode);
          // this.duplicateStatus = true;
        }
      });

      // this.formValid = true;
    //}
  }

  shake() {
    const elem = document.getElementById('myForm');
    var i = 0;
    elem!.classList.add('error');
    var t = setInterval(function() {
      i++;
      if (i === 1) {
        elem!.style.marginLeft = '-10px';
      } else if (i === 2) {
        elem!.style.marginLeft = '10px';
      } else if (i === 3) {
        elem!.style.marginLeft = '0px';
      } else {
        elem!.classList.remove('error');
        clearInterval(t);
      }
    }, 50);
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }

}