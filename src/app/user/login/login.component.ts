import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClientService } from '../../shared/services/http-client.service';
import { AuthService } from '../../shared/services/auth.service';
import { KitchenSinkService } from '../../shared/services/kitchen-sink.service';
import { Constants } from '../../shared/constants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @BlockUI('login-area') blockUI: NgBlockUI;
  private error : string =''
  private message : string ='';
  private loginForm : FormGroup;
  private login: any = {email: null, password: null};
  private isAuthenticating: boolean;

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
    this.loginForm = this.buildLoginForm();
  }

  buildLoginForm() {
    return this.formBuilder.group({email : [this.login.email, [Validators.required, Validators.maxLength(40)] ],
        password : [this.login.password, [Validators.required, Validators.maxLength(40)] ]  
    });
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
onLogin(form) {
    this.resetMessages();
    this.blockUI.start('Authenticating...');
    this.authService.logOut();
    const url = `${this.constants.API_BASE_URI}/user/login`;
    this.httpClientService
        .postObservable(url, form, true)
        .subscribe(
            (response) =>  {
                this.blockUI.stop();
                if(response.ok) {
                  this.router.navigate(['/invoice'])
                }
                else{
                  this.error = response["Message"];
                }
            },
            (error) => { this.handleError(error); }
        );
            
  }

  onForgotPasswordClicked() {
    this.router.navigate(['/user/forgot-password'])
  }

  resetMessages(){
      this.message = '';
      this.error = '';
  }

}
