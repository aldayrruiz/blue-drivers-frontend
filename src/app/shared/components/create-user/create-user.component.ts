import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/core';
import { CreateUserService, CreateUser } from '../../../core';

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
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  roleSelected = Role.USER;
  credentials: FormGroup;
  submitted = false;
  hide = true;
  hide2 = true;

  constructor(private fb: FormBuilder, private router: Router, private createUserSrv : CreateUserService) {}

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: [
        'aldayr.ruiz@opendeusto.es',
        [Validators.required, Validators.email],
      ],
      username: ['aldayr', [Validators.required]],
      password: ['password', [Validators.required, Validators.minLength(6)]],
      password2: ['password', [Validators.required, Validators.minLength(6)]],
    });
  }

  get username(): AbstractControl {
    return this.credentials.get('username');
  }

  get email(): AbstractControl {
    return this.credentials.get('email');
  }

  get password(): AbstractControl {
    return this.credentials.get('password');
  }

  get password2(): AbstractControl {
    return this.credentials.get('password2');
  }

  matcher = new MyErrorStateMatcher();

  createUser(): void {
    if (!this.passwordsMatch()) {
      console.log("Password doesn't match");
    }

    const newUser: CreateUser = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      role: this.roleSelected
    }
  }

  passwordsMatch(): boolean {
    return this.password.value === this.password2.value;
  }
}
