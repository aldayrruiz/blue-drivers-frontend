import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserService } from 'src/app/core';
import { SnackerService } from 'src/app/shared/services/snacker.service';

@Component({
  selector: 'app-edit-allowed-vehicle-types',
  templateUrl: './edit-allowed-vehicle-types.component.html',
  styleUrls: ['./edit-allowed-vehicle-types.component.css']
})
export class EditAllowedVehicleTypesComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSrv: UserService,
    private snacker: SnackerService
  ) { }

  ngOnInit(): void {
  }

  resolveUser(): void {
    this.route.data.subscribe((response) => {
      console.log('User response received!', response);
      this.user = response['user'];
    });
  }

}
