import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoginService, SnackerService } from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { MyErrorStateMatcher } from 'src/app/shared/utils/my-error-state-matcher';

const MIN_PASS_LENGTH = 6;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  credentials: FormGroup;
  submitted = false;
  hide = true;
  sending = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snacker: SnackerService,
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(MIN_PASS_LENGTH)],
      ],
    });
  }

  private getFormData() {
    // username is used instead of email because of server convert username to email by default at login.
    return {
      username: this.email.value,
      password: this.password.value,
    };
  }

  async login(): Promise<void> {
    this.sending = true;
    const credentials = this.getFormData();

    this.loginService
      .login(credentials)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => {
          this.router.navigateByUrl('/admin', { replaceUrl: true });
        },
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

  matcher = new MyErrorStateMatcher();
}
