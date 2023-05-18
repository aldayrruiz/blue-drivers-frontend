import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeleteUserComponent } from '@modules/users/dialogs/delete-user/delete-user.component';
import { MyAngularMaterialModule } from '@shared/modules/angular-material.module';

@NgModule({
  declarations: [DeleteUserComponent],
  imports: [CommonModule, MyAngularMaterialModule],
  exports: [DeleteUserComponent],
})
export class UserDialogsModule {}
