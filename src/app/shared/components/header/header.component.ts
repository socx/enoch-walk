import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }
  
    ngOnInit() {
    }
  
    onNavigate(route) {
      this.router.navigate([`/${route}`]);
    }
  
    public collapsed(event:any):void {
    }
  
    public expanded(event:any):void {
    }
}
