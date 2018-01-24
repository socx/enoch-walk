import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlockUIModule } from 'ng-block-ui';
import { CollapseModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Constants } from './shared/constants';
import { AuthService } from './shared/services/auth.service';
import { HttpClientService } from './shared/services/http-client.service';
import { KitchenSinkService } from './shared/services/kitchen-sink.service';
import { HttpModule } from '@angular/http';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { ModalModule } from './bootstrap-modal/bootstrap-modal.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InvoicesComponent,
    InvoiceListComponent
  ],
  imports: [
  AppRoutingModule,
    BrowserModule,
    BlockUIModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    HttpModule,
    ModalModule
  ],
  providers: [Constants, AuthService, HttpClientService, KitchenSinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
