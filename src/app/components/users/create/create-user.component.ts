/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CreateUser, Role } from 'src/app/core/models';
import {
  ErrorMessageService,
  BlueDriversRouter,
  LocalStorage,
  SnackerService,
  UserService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import {
  userBleValidators,
  userEmailValidators,
  userFullnameValidators,
} from 'src/app/core/validators/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  credentials: FormGroup;
  sending = false;

  constructor(
    private errorMessage: ErrorMessageService,
    private formBuilder: FormBuilder,
    private snacker: SnackerService,
    private storage: LocalStorage,
    private userSrv: UserService,
    private router: BlueDriversRouter
  ) {}

  get fullname(): AbstractControl {
    return this.credentials.get('fullname');
  }

  get email(): AbstractControl {
    return this.credentials.get('email');
  }

  get bleUserId(): AbstractControl {
    return this.credentials.get('bleUserId');
  }

  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      email: ['', userEmailValidators],
      fullname: ['', userFullnameValidators],
      bleUserId: ['', userBleValidators],
    });
  }

  createUser(): void {
    const newUser = this.getFormData();
    this.sending = true;
    const msg =
      'Se ha enviado un email al nuevo usuario con sus credenciales para entrar en la app móvil.';
    this.userSrv
      .create(newUser)
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
    const tenant = this.storage.getTenant();
    const newUser: CreateUser = {
      email: this.email.value,
      fullname: this.fullname.value,
      ble_user_id: this.bleUserId.value,
      role: Role.USER,
      tenant,
    };
    return newUser;
  }
}
