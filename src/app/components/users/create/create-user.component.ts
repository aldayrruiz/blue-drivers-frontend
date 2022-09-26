import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import { CreateUser, UserRole, TenantStorage } from 'src/app/core/models';
import {
  BlueDriversRouter,
  ErrorMessageService,
  LocalStorage,
  SnackerService,
  UserService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import {
  userBleValidators,
  userEmailValidators,
  userFullnameValidators,
  userRoleValidators,
} from 'src/app/core/validators/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  formGroup: FormGroup;
  sending = false;
  tenant: TenantStorage;

  constructor(
    private errorMessage: ErrorMessageService,
    private formBuilder: FormBuilder,
    private snacker: SnackerService,
    private storage: LocalStorage,
    private userSrv: UserService,
    private router: BlueDriversRouter
  ) {
    this.tenant = this.storage.getTenant();
  }

  get email(): AbstractControl {
    return this.formGroup.get('email');
  }

  get fullname(): AbstractControl {
    return this.formGroup.get('fullname');
  }

  get role(): AbstractControl {
    return this.formGroup.get('role');
  }

  get bleUserId(): AbstractControl {
    return this.formGroup.get('bleUserId');
  }

  get supervisor(): AbstractControl {
    return this.formGroup.get('supervisor');
  }

  get interventor(): AbstractControl {
    return this.formGroup.get('interventor');
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', userEmailValidators],
      fullname: ['', userFullnameValidators],
      role: [UserRole.USER, userRoleValidators],
      bleUserId: ['', userBleValidators],
      supervisor: [false, []],
      interventor: [false, []],
    });
  }

  createUser(): void {
    const user = this.getFormData();
    // console.log(user);
    this.sending = true;
    const msg =
      'Se ha enviado un email al nuevo usuario con sus credenciales para entrar en la app móvil.';
    this.userSrv
      .create(user)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: async () => {
          this.router.goToUsers();
          this.snacker.showSuccessful(msg);
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        },
      });
  }

  private getFormData(): CreateUser {
    const tenant = this.storage.getTenant().id;
    const email = this.email.value;
    const fullname = this.fullname.value;
    const ble_user_id = this.bleUserId.value;
    const role = this.role.value;
    const is_supervisor = this.supervisor.value;
    const is_interventor = this.interventor.value;

    return { email, fullname, ble_user_id, role, tenant, is_supervisor, is_interventor };
  }
}
