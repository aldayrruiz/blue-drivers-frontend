import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersComponentsModule } from '@modules/users/components/users-components.module';
import { UserDialogsModule } from '@modules/users/dialogs/user-dialogs.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, UsersComponentsModule, UserDialogsModule],
})
export class UsersPageModule {}
