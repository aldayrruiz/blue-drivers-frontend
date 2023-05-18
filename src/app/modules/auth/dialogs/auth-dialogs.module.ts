import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';
import { ResendRegistrationEmailComponent } from './resend-email-registration/resend-registration-email.component';

@NgModule({
  declarations: [ResendRegistrationEmailComponent],
  imports: [FormsModule, CommonModule, MyAngularMaterialModule],
  exports: [ResendRegistrationEmailComponent],
})
export class AuthDialogsModule {}
