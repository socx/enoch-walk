import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.buildLoginForm();
  }

  buildLoginForm() {
    return this.formBuilder.group({email : [this.login.email, [Validators.required, Validators.maxLength(40)] ],
        password : [this.login.password, [Validators.required, Validators.maxLength(40)] ]  
    });
  }

  onLogin(form) {
    console.log('logged in')
  }

  onForgotPasswordClicked() {

  }

}
