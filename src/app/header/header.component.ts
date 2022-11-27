import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) {
    
    window.localStorage.removeItem("isLoginFromUser");
   }

  ngOnInit(): void {
  }
  onAdminHandler(){
    window.localStorage.setItem("isLoginFromUser", "true");
    this.router.navigate(['/Login'])

  }
}
