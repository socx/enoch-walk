import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AuthService } from '../../shared/services/auth.service';
import { KitchenSinkService } from '../../shared/services/kitchen-sink.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../../shared/constants';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-invoice-add-edit',
  templateUrl: './invoice-add-edit.component.html',
  styleUrls: ['./invoice-add-edit.component.css']
})
export class InvoiceAddEditComponent implements OnInit {

  @BlockUI('invoice-area') blockUI: NgBlockUI;
  private error : string =''
  private message : string ='';
  private invoiceForm : FormGroup;
  private invoice: any = {
    invoiceNumber: null,
    paymentTerms: null,
    invoiceDate: null,
    paymentDate: null
  };
  private invoiceItems : any[] = [
    {index: 1, item: 'item1', quantity: 3, rate:4, amount:25},
    {index: 2, item: 'item2', quantity: 3, rate:4, amount:25},
    {index: 3, item: 'item3', quantity: 3, rate:4, amount:25},
  ];
  private API_BASE_URI :string = this.constants.API_BASE_URI;
  private activeTab  : string ='all';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private constants: Constants,
    private authService: AuthService,
    private httpClientService: HttpClientService,
    private kitchenSinkService : KitchenSinkService
  ) { }

  ngOnInit() {
    this.invoiceForm = this.buildForm();
  }

  buildForm() {
    return this.formBuilder.group({
      invoiceNumber : [this.invoice.invoiceNumber, [Validators.required, Validators.maxLength(40)] ],
      paymentTerms : [this.invoice.paymentTerms, [Validators.required, Validators.maxLength(40)] ],
      invoiceDate : [this.invoice.invoiceDate, [Validators.required, Validators.maxLength(40)] ],
      paymentDate : [this.invoice.paymentDate, [Validators.required, Validators.maxLength(40)] ]  
    });
  }
  
  onTabClick(tabName){
    this.activeTab = tabName;
  }

  addInvoiceItem(){
    this.invoiceItems.push({
      index: this.invoiceItems.length,
      item : null,
      quantity : null,
      rate : null,
      amount : null
    });
  }

  removeInvoiceItem(invoiceItem : any){
    debugger
    const index  = this.invoiceItems.indexOf(invoiceItem);
    this.invoiceItems.splice(index);
  }
  handleError(error){
    this.blockUI.stop();
    if (error.status === this.constants.ERROR_401) {   
        this.authService.logOut();     
        this.router.navigate(['/']);
    } else {
        let errorJSON = JSON.parse(error.text())
        this.error = errorJSON && errorJSON.Message ? errorJSON.Message : error.statusText;
    }
  }
  onInvoice(form) {
      this.resetMessages();
      this.blockUI.start('Submitting...');
      const url = `${this.constants.API_BASE_URI}/invoice`;
      // this.httpClientService
      //     .postObservable(url, form, true)
      //     .subscribe(
      //         (response) =>  {
      //             this.blockUI.stop();
      //             if(response.ok) {
      //               this.router.navigate(['/invoices'])
      //             }
      //             else{
      //               this.error = response["Message"];
      //             }
      //         },
      //         (error) => { this.handleError(error); }
      //     );
      alert(form)
              
    }

    resetMessages(){
        this.message = '';
        this.error = '';
    }

}
