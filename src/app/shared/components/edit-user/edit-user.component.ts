import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser, EditUser, Role, User, UserService } from 'src/app/core';
import { MyErrorStateMatcher } from 'src/app/pages/login/login.page';
import { SnackerService } from '../../services/snacker.service';

const MIN_PASS_LENGTH = 6;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  roleSelected = Role.USER;
  credentials: FormGroup;
  submitted = false;
  hide = true;
  hide2 = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private createUserSrv: UserService,
    private snacker: SnackerService) { }

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: [
        'aldayr.ruiz@opendeusto.es',
        [Validators.required, Validators.email],
      ],
      username: ['aldayr', [Validators.required]],
      password: [
        'password',
        [Validators.required, Validators.minLength(MIN_PASS_LENGTH)],
      ]
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
  
  matcher = new MyErrorStateMatcher();

  private getFormData(): EditUser {
    const newUser: EditUser = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      role: this.roleSelected,
    };
    return newUser;
  }

  editUser(): void {
    const newUser = this.getFormData();

    console.log(newUser);

    this.createUserSrv.createUser(newUser).subscribe(
      async (data: CreateUser) => {
        const message = 'Usuario creado con éxito';
        this.snacker.open(message);
      },
      async (error) => {
        const errors: string[] = Object.values(error.error);
        const message = errors[0];
        this.snacker.open(message);
      }
    );
  }

}
