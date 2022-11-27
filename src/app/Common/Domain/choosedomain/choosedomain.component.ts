import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choosedomain',
  templateUrl: './choosedomain.component.html',
  styleUrls: ['./choosedomain.component.scss']
})
export class ChoosedomainComponent implements OnInit {

  constructor(  public router: Router,) { 
    localStorage.removeItem('price')
    localStorage.removeItem('id')
  }

  ngOnInit(): void {
  }
  cartOrder(amount:any,id:any,type:any){
    
    localStorage.setItem('price', amount)
    localStorage.setItem('id', id)
    localStorage.setItem('eventype', type)

    this.router.navigate(['/choosedomain'])
  }

}
