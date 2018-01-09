import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  isLoginPage : boolean;
  showHeader : boolean  = false;
  showHeaderRoutes: any = ['', '/user', '/user/login'];

  constructor(router: Router) {
    router.events
    .subscribe((routeSnapshot:any) =>  {
        this.isLoginPage = (this.showHeaderRoutes.indexOf(routeSnapshot.url) > -1)
        this.showHeader = (this.showHeaderRoutes.indexOf(routeSnapshot.url) <= -1);
    });
  }
}
