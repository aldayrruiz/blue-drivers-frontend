import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/shared.module';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, LoginPageRoutingModule, SharedModule],
  declarations: [LoginComponent],
})
export class LoginPageModule {}
