import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService, SnackerService } from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';

const MIN_PASS_LENGTH = 6;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  credentials: FormGroup;
  submitted = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snacker: SnackerService,
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email],
      ],
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
    const credentials = this.getFormData();
    console.log('Login: ', credentials);

    this.loginService.login(credentials).subscribe(
      async () => {
        this.router.navigateByUrl('/admin', { replaceUrl: true });
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.openError(message);
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
