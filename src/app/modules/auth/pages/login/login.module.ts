import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthComponentsModule } from '@modules/auth/components/auth-components.module';
import { AuthDialogsModule } from '@modules/auth/dialogs/auth-dialogs.module';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, LoginPageRoutingModule, AuthDialogsModule, AuthComponentsModule],
  declarations: [LoginComponent],
})
export class LoginPageModule {}
