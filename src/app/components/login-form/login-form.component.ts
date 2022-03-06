import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import {
  ErrorMessageService,
  FleetRouter,
  LoginService,
  SnackerService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import {
  emailValidators,
  passwordValidators,
} from 'src/app/core/validators/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  credentials: FormGroup;
  hide = true;
  sending = false;

  constructor(
    private readonly errorMessage: ErrorMessageService,
    private readonly loginService: LoginService,
    private readonly formBuilder: FormBuilder,
    private readonly snacker: SnackerService,
    private readonly router: FleetRouter
  ) {}

  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      email: ['', emailValidators],
      password: ['', passwordValidators],
    });
  }

  private getFormData() {
    // username is used instead of email because of server convert username to email by default at login.
    return {
      username: this.email.value,
      password: this.password.value,
    };
  }

  async login() {
    this.sending = true;
    const credentials = this.getFormData();

    this.loginService
      .login(credentials)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => this.router.goToHome(),
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        }
      );
  }

  get email(): AbstractControl {
    return this.credentials.get('email');
  }

  get password(): AbstractControl {
    return this.credentials.get('password');
  }
}
