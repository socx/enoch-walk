import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';

const appRoutes: Routes = [
  { path : '', redirectTo: 'user/login', pathMatch: 'full' },
  { path : 'user', component: UserComponent, children:[
    { path : 'login', component: LoginComponent}
  ]},
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
