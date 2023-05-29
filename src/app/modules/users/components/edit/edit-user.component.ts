import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditPatchUser, TenantStorage, User } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, LocalStorage, SnackerService, UserService } from '@core/services';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';
import { userBleValidators, userRoleValidators } from '@core/validators/user';
import { finalize } from 'rxjs';

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
  tenant: TenantStorage;

  constructor(
    private errorMessage: ErrorMessageService,
    private router: BlueDriversRouter,
    private formBuilder: FormBuilder,
    private snackerService: SnackerService,
    private route: ActivatedRoute,
    private storage: LocalStorage,
    private userSrv: UserService
  ) {
    this.tenant = this.storage.getTenant();
  }

  get role(): FormControl {
    return this.formGroup.get('role') as FormControl;
  }

  get bleUserId(): FormControl {
    return this.formGroup.get('bleUserId') as FormControl;
  }

  get supervisor(): FormControl {
    return this.formGroup.get('supervisor') as FormControl;
  }

  get interventor(): FormControl {
    return this.formGroup.get('interventor') as FormControl;
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
          this.snackerService.showSuccessful(message);
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snackerService.showError(message);
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
      role: [user.role, userRoleValidators],
      bleUserId: [user.ble_user_id, userBleValidators],
      supervisor: [user.is_supervisor, []],
      interventor: [user.is_interventor, []],
    });
  }

  private getUpdatedData(): EditPatchUser {
    const ble_user_id = this.bleUserId.value || '';
    const role = this.role.value;
    const is_supervisor = this.supervisor.value;
    const is_interventor = this.interventor.value;
    return { role, ble_user_id, is_supervisor, is_interventor };
  }
}
