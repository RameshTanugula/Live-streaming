import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  form: any;
  submit: boolean = false;
  constructor(private formBuilder: FormBuilder, public router: Router) {
    localStorage.removeItem('date')
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    })
  }
  continue(value: any) {
    this.submit = true;
    if (this.form.valid) {
      localStorage.setItem('date', value.date + value.time)
      this.router.navigate(['/CheckoutReview'])
    }
  }

}
