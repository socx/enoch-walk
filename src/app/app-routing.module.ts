import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { InvoiceAddEditComponent } from './invoices/invoice-add-edit/invoice-add-edit.component';

const appRoutes: Routes = [
  { path : '', redirectTo: 'user/login', pathMatch: 'full' },
  { path : 'user', component: UserComponent, children:[
    { path : 'login', component: LoginComponent },
    { path : 'forgot-password', component: ForgotPasswordComponent },
    { path : 'reset-password', component: ResetPasswordComponent },
    { path : 'reset-password/:token', component: ResetPasswordComponent }
  ]},
  { path : 'invoices', component: InvoicesComponent, children:[
    { path : '', component: InvoiceListComponent },
    { path : 'add', component: InvoiceAddEditComponent },
    { path : ':id/edit', component: InvoiceAddEditComponent }
  ]},
  { path : 'invoice', redirectTo: 'invoices' },
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
