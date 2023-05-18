import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '@modules/auth/components/login-form/login-form.component';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, MyAngularMaterialModule, ReactiveFormsModule],
  exports: [LoginFormComponent],
})
export class AuthComponentsModule {}
