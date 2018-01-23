import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { HttpClientService } from '../../shared/services/http-client.service';
import { Constants } from '../../shared/constants';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getTestBed } from '@angular/core/testing';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @BlockUI('password-reset-area') blockUI: NgBlockUI
  private error: string;
  private message: string;
  private passwordResetForm: FormGroup;
  private passwordReset : any = {
    resetToken: null,
    displayName: null,
    resetEmail: null,
    newPassword: null,
    confirmPassword: null
  };
  private passwordResetDisplayName: string = '';

  constructor(
    private formBuilder : FormBuilder,
    private constants : Constants,
    private route: ActivatedRoute,
    private router: Router,
    private httpClientService : HttpClientService,
    private authService : AuthService) { }

  ngOnInit() {
    this.passwordResetForm = this.buildPasswordResetForm();
    this.route.params.subscribe((params: Params) => {
      if(params['token'] && params['token'] != -1 ) {
          let token = params['token'];
          token = encodeURIComponent(token);
          // const url =  `${this.constants.API_BASE_URI}/user/reset-password?token=${token}`
          const url =  `${this.constants.API_BASE_URI}/user/reset-password`
          this.httpClientService
            .getObservable(url, false)
            .subscribe(
              (response) =>  {
                  if(!response.ok) {
                      this.error = this.constants.ERROR_TOKEN_EXPIRED;
                  }else{
                    this.passwordResetDisplayName = response["_body"]['displayName'];
                  }                              
              },
              (error) => {
                  let errorBody = error.json();
                  this.error = errorBody.Message ||  error.statusText; 
              }
            );
        }
    });
  }
  buildPasswordResetForm(): any {
    return this.formBuilder.group({
      displayName : [this.passwordReset.displayName, [Validators.required, Validators.maxLength(40)] ],
      resetEmail : [this.passwordReset.resetEmail, [Validators.required, Validators.maxLength(40)] ],
      newPassword : [this.passwordReset.newPassword, [Validators.required, Validators.maxLength(40)] ],
      confirmPassword : [this.passwordReset.confirmPassword, [Validators.required, Validators.maxLength(40)] ],
      resetToken : [this.passwordReset.resetToken, [Validators.required, Validators.maxLength(100)] ]  
    });
  }

  onResetPassword(form) {
    this.resetMessages();
    this.blockUI.start('Authenticating...');
    this.authService.logOut();
    const url = `${this.constants.API_BASE_URI}/user/reset-password`;
    this.httpClientService
        .postObservable(url, form, true)
        .subscribe(
            (response) =>  {
                this.blockUI.stop();
                if(response.ok) {
                  this.message = "Password reset successfully"
                }
                else{
                  this.error = response["Message"];
                }
            },
            (error) => { this.handleError(error); }
        );
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

    resetMessages(){
        this.message = '';
        this.error = '';
    }

}
