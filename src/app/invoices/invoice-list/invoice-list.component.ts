import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AuthService } from '../../shared/services/auth.service';
import { KitchenSinkService } from '../../shared/services/kitchen-sink.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../../shared/constants';

import invoiceList from './invoice-list.json';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  @BlockUI('invoice-area') blockUI: NgBlockUI;
  private error : string =''
  private message : string ='';
  private startIndex : number = 0;
  private API_BASE_URI :string = this.constants.API_BASE_URI;
  private invoices : any;
  
  constructor(
    private router: Router,
    // private activatedRoute : ActivatedRoute,
    private constants: Constants,
    private authService: AuthService,
    private httpClientService: HttpClientService,
    private kitchenSinkService : KitchenSinkService
  ) { }

  ngOnInit() {
    this.populateList();
  }

  populateList() {
    this.startIndex = 0;
    this.blockUI.start(`${this.constants.LOADING_TEXT} invoices...`);
    let uri = `${this.API_BASE_URI}/invoices/List?pagesize=${this.constants.DEFAULT_LIST_PAGE_SIZE}&startindex=${this.startIndex}`
    // this.httpClientService.getJSON(uri).subscribe(
    //       (res) => {
    //         debugger          
    //         this.invoices = this.kitchenSinkService.processApiData(res, this.constants.INVOICE_FIELDS_EXCULSION_LIST);                
    //         this.blockUI.stop();
    //       },
    //       (error) => { this.blockUI.stop(); this.handleError(error); }
    //   );

    this.invoices = invoiceList;
    setTimeout(()=>{ this.blockUI.stop(); }, 1200);
  }

  handleError(error){
      if (error.status === this.constants.ERROR_401) {  
          this.blockUI.stop();  
          this.authService.logOut();                 
          this.router.navigate(['/']);
      } else {
          this.error = error.statusText;
      }
  }
  log(val) { console.log(val); }

}
