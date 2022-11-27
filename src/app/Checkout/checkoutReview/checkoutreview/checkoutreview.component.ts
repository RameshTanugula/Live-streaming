import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice.service';

@Component({
  selector: 'app-checkoutreview',
  templateUrl: './checkoutreview.component.html',
  styleUrls: ['./checkoutreview.component.scss']
})
export class CheckoutreviewComponent implements OnInit {

  constructor(private router: Router, private service: AppserviceService) { }

  ngOnInit(): void {
  }
  opendialog() {

  }
  checkout() {
    var url = 'checkout';
    var body = {
      domain: localStorage.getItem('domain'),
      user_id: window.localStorage.getItem('randmcode'),
      category_id: localStorage.getItem('id'),
      event_date: localStorage.getItem('date'),
      promo_code: 'live90',
      cost: window.localStorage.getItem('cost'),
      eventType:window.localStorage.getItem('eventType'),
      userData: {
      name: window.localStorage.getItem('name'),
      email:window.localStorage.getItem('email'),
      mobile:window.localStorage.getItem('mobile')
    }
    }
    // body.userData = JSON.parse(body.userData);
    if (!body.user_id) {
      if(window.confirm('something went wrong, Please login back and try again.')) {
        this.router.navigate(['./Login']);
      }
    } else {
      this.service.postData(url, body).subscribe(res => {
        localStorage.clear();
        window.alert('Event registerd. Please contact admin for the confirmation..')
        this.router.navigate(['./Login']);
      }, err => { 
        window.alert('Event registerd. Please contact admin for the confirmation..')
        this.router.navigate(['./Login']);
      })
    }
  }

  goto() {
    this.router.navigate(['/payment'])
  }
}
