import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackerService } from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { MyErrorStateMatcher } from 'src/app/shared/utils/my-error-state-matcher';

const MIN_PASS_LENGTH = 6;

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  credentials: FormGroup;
  submitted = false;
  hide = true;
  sending = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snacker: SnackerService,
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  async register() {
    console.log('You clicked register');
  }

  get email(): AbstractControl {
    return this.credentials.get('email');
  }

  get fullname(): AbstractControl {
    return this.credentials.get('fullname');
  }

  get password(): AbstractControl {
    return this.credentials.get('password');
  }

  private initFormGroup() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(MIN_PASS_LENGTH)],
      ],
    });
  }

  matcher = new MyErrorStateMatcher();
}
