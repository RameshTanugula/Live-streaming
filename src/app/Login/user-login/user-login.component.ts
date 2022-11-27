import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice.service';

interface IUser {
  name: string;
  nickname: string;
  email: string;
  password: string;
  showPassword: boolean;
}
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm!: FormGroup;
  isLoading: boolean = true;
  signIn: boolean = true;
  constructor(
    public router: Router,
    private fb: FormBuilder,
    private service: AppserviceService
  ) {
    this.loginForm = fb.group({
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isLoading = false;

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['']
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  login() {
    this.isLoading = true;
    // this.router.navigate(['/Domain'])
    var url = 'login';
    this.service.postData(url, this.loginForm.value).subscribe((res: any) => {
      if (res?.data) {
        alert('Login Succesfully')
        window.localStorage.setItem("name", res.data.name);
        window.localStorage.setItem("mobile", res.data.mobile);
        window.localStorage.setItem("email", res.data.email);
        const isLoginFromUser = !!window.localStorage.getItem("isLoginFromUser")
        if (isLoginFromUser) {
          this.router.navigate(['/admin/user']);
        } else {
          this.router.navigate(['/Domain']);
        }
        window.localStorage.removeItem("isLoginFromUser");

      } else {
        alert('Login Failed')
      }
    }, (err)=>{
      alert('Login Failed')
    })
    // var UploadFile = new FormData();
    // UploadFile.append("UserName", val.userName);
    // UploadFile.append("Password", val.password);
    // var url = "/api/Values/Login"
    // this.generalService.PostData(url, UploadFile).then(data => {
    //   ;
    //   if (data == 'NOT EXIST') {
    //     this.generalService.ShowAlert('ERROR', 'No data found.', 'error')
    //   }
    //   else {
    //     localStorage.setItem('loginData', JSON.stringify(data));
    //     if (localStorage.getItem('navToCustProd') == 'navToCustProd') {
    //       this.router.navigateByUrl('/Products');
    //     }
    //     else if (localStorage.getItem('navToCustProd') == 'navToCustProdFromSearch') {
    //       this.router.navigateByUrl('/Products');
    //     }

    //     else {
    //       this.router.navigateByUrl('/Products');
    //     }
    //     this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: 'Login success' });
    //   }
    // }, err => {
    //   this.generalService.ShowAlert('ERROR', 'Something went wrong. Please try again later.', 'error')
    // });
  }
  signUp() {
    this.signIn = false;
  }
  signIn1() {
    this.signIn = true;
  }

  register() {
    this.isLoading = true;
    var url = 'register'
    this.service.postData(url, this.registerForm.value).subscribe(res => {
      alert('Registered successfully!!')
    })
    // ;
    // let arr = [];
    // arr.push({
    //   Name: val.userName,
    //   Mobile: val.mobile,
    //   Email: val.email,
    //   Password: val.password,
    // })
    // var UploadFile = new FormData();
    // UploadFile.append("JSON", JSON.stringify(arr));
    // UploadFile.append("flag", '1');
    // var url = "/api/Values/Registration"
    // this.generalService.PostData(url, UploadFile).then(data => {
    //   ;
    //   if (data == 'SUCCESS') {
    //     this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: 'Registeration sucessful' });
    //     val.userName = val.mobile
    //     this.login(val)
    //   }
    //   else if (data == 'MOBILE EXISTS') {
    //     this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'Mobile number already registered' });
    //   }
    //   else if (data == 'EMAIL EXISTS') {
    //     this.messageService.add({ severity: 'error', summary: 'ERROR', detail: 'EMAIL already registered' });
    //   }
    // }, err => {

    // });
  }
}
