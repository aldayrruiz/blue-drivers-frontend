import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  user: User;
  roleSelected = Role.USER;
  credentials: FormGroup;
  submitted = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userSrv: UserService,
    private snacker: SnackerService) { }

  ngOnInit(): void {
    this.resolveUser();

    this.credentials = this.fb.group({
      email: [
        this.user.email,
        [Validators.required, Validators.email],
      ],
      username: [this.user.username, [Validators.required]],
      password: [
        '',
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

    this.userSrv.updateUser(this.user.id, newUser).subscribe(
      async (data: User) => {
        const message = 'Usuario editado con exito!';
        this.snacker.open(message);
      },
      async (error) => {
        const errors: string[] = Object.values(error.error);
        const message = errors[0];
        this.snacker.open(message);
      }
    );
  }

  resolveUser(): void {
    this.route.data.subscribe((response) => {
      console.log('User response received!', response);
      this.user = response['user'];
    });
  }
}
  