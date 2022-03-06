import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CreateUser } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  SnackerService,
  UserService,
} from 'src/app/core/services';
import {
  emailValidators,
  fullnameValidators,
} from 'src/app/core/validators/user';
import { CustomErrorStateMatcher } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  matcher = new CustomErrorStateMatcher();
  credentials: FormGroup;
  sending = false;

  constructor(
    private readonly errorMessage: ErrorMessageService,
    private readonly formBuilder: FormBuilder,
    private readonly snacker: SnackerService,
    private readonly userSrv: UserService,
    private readonly router: FleetRouter
  ) {}

  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      email: ['', emailValidators],
      fullname: ['', fullnameValidators],
    });
  }

  private getFormData(): CreateUser {
    const newUser: CreateUser = {
      email: this.email.value,
      fullname: this.fullname.value,
    };
    return newUser;
  }

  createUser(): void {
    const newUser = this.getFormData();
    this.sending = true;
    const msg =
      'Se ha enviado un email al nuevo usuario con sus credenciales para entrar en la app móvil.';
    this.userSrv
      .create(newUser)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => {
          this.router.goToUsers();
          this.snacker.showSuccessful(msg);
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        }
      );
  }

  get fullname(): AbstractControl {
    return this.credentials.get('fullname');
  }

  get email(): AbstractControl {
    return this.credentials.get('email');
  }
}
