import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public appVersionNumber : any;
  public environment : any;
  constructor() { }

  ngOnInit() {
    this.appVersionNumber = '0.0.1';
    this.environment = 'dev';
  }

}
