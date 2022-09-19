
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { BaseTableComponent } from 'src/app/components/base-table/base-table.component';
import { EditPatchUser, Role, User, Vehicle } from 'src/app/core/models';
import {
  AuthService,
  ErrorMessageService,
  LocalStorage,
  SnackerService,
  UserService,
} from 'src/app/core/services';
import { DeleteUserComponent } from '../../dialogs/delete-user/delete-user.component';
import { ResendRegistrationEmailComponent } from '../../dialogs/resend-email-registration/resend-registration-email.component';

interface UserRow {
  id: string;
  fullname: string;
  email: string;
  dateJoined: string;
  role: string;
  allowedVehicleTypes?: Vehicle[];
  isDisabled?: boolean;
  is_supervisor: boolean;
  is_interventor: boolean;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent extends BaseTableComponent<User, UserRow> {
  columns = [
    'fullname',
    'email',
    'roles',
    'dateJoined',
    'allowedTypes',
    'edit',
    'isDisabled',
    'resendRegistrationEmail',
    'delete',
  ];

  private myId: string;

  constructor(
    private errorMessage: ErrorMessageService,
    private authService: AuthService,
    private snacker: SnackerService,
    private storage: LocalStorage,
    private userSrv: UserService,
    private dialog: MatDialog
  ) {
    super();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    super.ngOnInit();
    this.myId = this.storage.getUserId();
  }

  openDeleteDialog(user: UserRow): void {
    const deleteUserDialog = this.dialog.open(DeleteUserComponent);

    deleteUserDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }

  openResendRegistrationEmailDialog(user: UserRow) {
    const resendRegistrationEmailDialog = this.dialog.open(ResendRegistrationEmailComponent);

    resendRegistrationEmailDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.resendRegistrationEmail(user.id);
      }
    });
  }

  preprocessData(data: User[]): UserRow[] {
    return data.map((user) => ({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      dateJoined: user.date_joined,
      isDisabled: user.is_disabled,
      allowedVehicleTypes: user.allowed_vehicles,
      is_supervisor: user.is_supervisor,
      is_interventor: user.is_interventor,
    }));
  }

  fetchDataAndUpdate(): void {
    this.userSrv
      .getAll(true)
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((users) => {
        const usersWithOutSuperAdmin = this.removeSuperAdmin(users);
        const usersOrderedAlphabetically = this.orderRowsAlphabetically(usersWithOutSuperAdmin);
        const usersOrderedByRole = this.orderRowsByRole(usersOrderedAlphabetically);
        this.initTable(usersOrderedByRole);
      });
  }

  changeDisabled(user: UserRow): void {
    const newIsDisabledStatus = !user.isDisabled;
    const data: EditPatchUser = { is_disabled: newIsDisabledStatus };
    this.userSrv.patch(user.id, data).subscribe(
      (response: EditPatchUser) => {
        user.isDisabled = response.is_disabled;
      },
      (errors) => console.error(errors)
    );
  }

  resendRegistrationEmail(userId: string) {
    this.authService.resendRegistrationEmail(userId).subscribe({
      next: () => {
        console.log('Successful resending');
      },
      error: () => {
        console.log('Error resending');
      },
    });
  }

  isMe = (u: UserRow) => this.myId === u.id;

  getBadgeColor = (n: number) => (n === 0 ? 'warn' : 'primary');

  getUserRolesLabel(user: UserRow) {
    const roles = [];
    switch (user.role) {
      case Role.ADMIN:
        roles.push('Super Administrador');
        break;
      case Role.ADMIN:
        roles.push('Administrador');
        break;
    }

    if (user.is_supervisor) {
      roles.push('Supervisor');
    }
    if (user.is_interventor) {
      roles.push('Interventor');
    }
    return roles.join(' / ');
  }

  private deleteUser(user: UserRow) {
    this.userSrv.delete(user.id).subscribe({
      next: async () => {
        const newUsers = this.models.filter((u) => u.id !== user.id);
        this.initTable(newUsers);
        this.snacker.showSuccessful(`El usuario ${user.fullname} ha sido eliminado.`);
      },
      error: async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.showError(message);
      },
    });
  }

  private removeSuperAdmin(users: User[]) {
    return users.filter((user) => user.role !== Role.SUPER_ADMIN);
  }

  private orderRowsAlphabetically(users: User[]) {
    const usersOrderedAlphabetically = users.sort((a, b) =>
      // Then order alphabetically
      a.fullname.localeCompare(b.fullname)
    );

    return usersOrderedAlphabetically;
  }

  private orderRowsByRole(users: User[]) {
    const usersOrderedAlphabetically = users.sort((a, b) => {
      // Admin must appear first
      // console.log(`Comparing: ${a.fullname} - ${b.fullname}`);
      if (b.role === Role.ADMIN) {
        return 1;
      }
      if (a.role === Role.ADMIN) {
        return -1;
      }
      return 0;
    });

    return usersOrderedAlphabetically;
  }
}
