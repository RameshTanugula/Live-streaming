import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selectdomain',
  templateUrl: './selectdomain.component.html',
  styleUrls: ['./selectdomain.component.scss']
})
export class SelectdomainComponent implements OnInit {
  name: any;
  form: any;
  submit: boolean = false;
  constructor(private formBuilder: FormBuilder,public router: Router) {
    localStorage.removeItem('domain')
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      domain: ['', Validators.required],
      category: ['', Validators.required]
    })
  }
  check(value: any) {
    
    this.submit = true;
    if (this.form.valid) {
      let randmcode = (Math.random() + 1).toString(36).substring(7);
      var url='https://homeliveevents.com/'+ value.category +'/'+value.domain+'/'+randmcode;
      localStorage.setItem('domain',url);
      localStorage.setItem('randmcode',randmcode);
      this.router.navigate(['/cart'])

    }
  }
}
