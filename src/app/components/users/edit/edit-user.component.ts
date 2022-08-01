/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { EditPatchUser, User } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  SnackerService,
  UserService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import { bleUserValidators } from 'src/app/core/validators/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  user: User;
  formGroup: FormGroup;
  sending = false;

  constructor(
    private userSrv: UserService,
    private errorMessage: ErrorMessageService,
    private formBuilder: FormBuilder,
    private snacker: SnackerService,
    private route: ActivatedRoute,
    private router: FleetRouter
  ) {}

  get bleUserId(): AbstractControl {
    return this.formGroup.get('bleUserId');
  }

  ngOnInit(): void {
    this.resolve();
    this.setFormGroup(this.user);
  }

  async edit() {
    const user = this.getUpdatedData();
    this.sending = true;
    this.userSrv
      .patch(this.user.id, user)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: async () => {
          this.router.goToUsers();
          const message = 'Usuario editado con éxito!';
          this.snacker.showSuccessful(message);
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        },
      });
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      this.user = response.user;
    });
  }

  private setFormGroup(user: User) {
    this.formGroup = this.formBuilder.group({
      bleUserId: [user.ble_user_id, bleUserValidators],
    });
  }

  private getUpdatedData(): EditPatchUser {
    const bleUserId = this.bleUserId.value || null;
    return {
      ble_user_id: bleUserId,
    };
  }
}
