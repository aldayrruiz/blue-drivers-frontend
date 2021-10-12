/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  EditPatchUser,
  LocalStorageService,
  SnackerService,
  User,
  UserService,
  USER_ID,
} from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';
import { DeleteUserComponent } from '../../dialogs/delete-user/delete-user.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  dateTimeFormat = PipeDates.dateTimeFormat;
  private myId: string;

  displayedColumns: string[] = [
    'fullname',
    'email',
    'date_joined',
    'allowed_vehicle_types',
    'is_disabled',
    'delete',
  ];

  constructor(
    private route: ActivatedRoute,
    private userSrv: UserService,
    private snacker: SnackerService,
    private storage: LocalStorageService,
    private errorMessage: ErrorMessageService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshTable();
    this.myId = this.storage.get(USER_ID);
  }

  openDeleteDialog(user: User): void {
    const deleteUserDialog = this.dialog.open(DeleteUserComponent);

    deleteUserDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }

  refreshTable(): void {
    this.route.data.subscribe((response) => {
      console.log('Users response received!', response);
      this.users = response['users'];
    });
  }

  changeDisabled(user: User): void {
    const newIsDisabledStatus = !user.is_disabled;
    const data: EditPatchUser = { is_disabled: newIsDisabledStatus };
    this.userSrv.patch(user.id, data).subscribe(
      (response: EditPatchUser) => {
        user.is_disabled = response.is_disabled;
      },
      (errors) => console.error(errors)
    );
  }

  isMe = (u: User) => this.myId === u.id;

  getBadgeColor = (n: number) => (n === 0 ? 'warn' : 'primary');

  private deleteUser(user: User) {
    this.userSrv.delete(user.id).subscribe(
      async () => {
        this.users = this.users.filter((u) => u !== user);
        this.snacker.openSuccessful(
          `El usuario ${user.fullname} ha sido eliminado.`
        );
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.openError(message);
      }
    );
  }
}
