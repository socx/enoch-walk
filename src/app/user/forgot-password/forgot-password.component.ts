import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AuthService } from '../../shared/services/auth.service';
import { KitchenSinkService } from '../../shared/services/kitchen-sink.service';
import { Constants } from '../../shared/constants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  @BlockUI('login-area') blockUI: NgBlockUI;
  private error : string =''
  private message : string ='';
  private forgotPasswordForm : FormGroup;
  private forgotPassword: any = {email: null};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private activatedRoute : ActivatedRoute,
    private constants: Constants,
    private authService: AuthService,
    private httpClientService: HttpClientService,
    // private kitchenSinkService: KitchenSinkService
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({email : [this.forgotPassword.email, [Validators.required, Validators.maxLength(40)] ]});
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

  onBackClicked(){
    this.router.navigate(['/user/login']);
  }
  onForgotPassword(form) {
      this.resetMessages();
      this.blockUI.start('Sending...');
      const url = `${this.constants.API_BASE_URI}/user/forgot-password`;
      this.httpClientService
          .postObservable(url, form, true)
          .subscribe(
              (response) =>  {
                  this.blockUI.stop()
                  if(response.ok) {
                    this.message = this.constants.FORGOT_PASSWORD_REQUEST_CONFIRM_MESSAGE;
                  }
                  else{
                    this.error = response["Message"];
                  }
              },
              (error) => { this.handleError(error); }
          ); 
    }

    resetMessages(){
        this.message = '';
        this.error = '';
    }

}
