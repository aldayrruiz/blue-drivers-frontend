import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../components/shared.module';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    SharedModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
