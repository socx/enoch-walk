import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';

const appRoutes: Routes = [
  { path : '', redirectTo: 'user/login', pathMatch: 'full' },
  { path : 'user', component: UserComponent, children:[
    { path : 'login', component: LoginComponent },
    { path : 'forgot-password', component: ForgotPasswordComponent }
  ]},
  { path : 'invoice', component : InvoiceComponent },
  { path : '**', redirectTo: 'user/login' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
