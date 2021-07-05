import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService, SnackerService, EditUser } from 'src/app/core';
import { PipeDates } from 'src/app/shared/utils/pipe-dates';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];
  dateTimeFormat = PipeDates.dateTimeFormat;

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
    private snacker: SnackerService
  ) {}

  ngOnInit(): void {
    this.refreshTable();
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
        // TODO: Si el usuario tiene reservas, tickets, etc. ¿Qué pasa con estos?
        this.snacker.open('Un error ha ocurrido. Intentelo mas tarde.');
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
    const data: EditUser = { is_disabled: newIsDisabledStatus };
    this.userSrv.patch(user.id, data).subscribe(response => {
      user.is_disabled = response.is_disabled;
    },
    errors => console.error(errors));
  }
}
