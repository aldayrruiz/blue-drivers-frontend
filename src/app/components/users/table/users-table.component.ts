import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  User,
  UserService,
  SnackerService,
  EditPatchUser,
  LocalStorageService,
  USER_ID,
} from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

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
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.refreshTable();
    this.myId = this.storage.get(USER_ID);
  }

  async deleteUser(user: User): Promise<void> {
    console.log('deleting: ', user);

    // TODO: Preguntar: ¿Está seguro...?

    this.userSrv.delete(user.id).subscribe(
      async () => {
        this.users = this.users.filter((u) => u !== user);
        this.snacker.open(`El usuario ${user.fullname} ha sido eliminado.`);
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.open(message);
      }
    );
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

  isMe(user: User): boolean {
    return this.myId === user.id;
  }

  getBadgeColor(user: User): string {
    return user.allowed_vehicles.length === 0 ? 'warn' : 'primary';
  }
}
