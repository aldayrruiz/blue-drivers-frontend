import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.credentials = this.fb.group({
      username: [
        'aldayr.ruiz@opendeusto.es',
        [Validators.required, Validators.email],
      ],
      password: ['password', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login(): Promise<void> {

    this.loginService.login(this.credentials.value).subscribe(
      async () => {
        this.router.navigateByUrl('/members', { replaceUrl: true });
      },
      (res) => {
        console.log("Bad login")
      }
    );
  }

  get username(): AbstractControl {
    return this.credentials.get('username');
  }

  get password(): AbstractControl {
    return this.credentials.get('password');
  }
}
