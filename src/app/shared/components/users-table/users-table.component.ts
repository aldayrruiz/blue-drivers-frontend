import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from 'src/app/core';
import { SnackerService } from '../../services/snacker.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  users: User[] = [];

  displayedColumns: string[] = [
    'username',
    'email',
    'date_joined',
    'edit',
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
    this.userSrv.deleteUser(user.id).subscribe(
      async () => {
        this.users = this.users.filter((u) => u !== user);
        this.snacker.open(`El usuario ${user.username} ha sido eliminado.`);
      },
      async (error) => {
        this.snacker.open('Un error ha ocurrido. Intentelo mas tarde.');
      }
    );
  }

  editUser(user: User): void {
    console.log('Go to edit: ', user);
  }

  refreshTable(): void {
    this.route.data.subscribe((response) => {
      console.log('Users response received!', response);
      this.users = response['users'];
    });
  }
}
