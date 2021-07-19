import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role, UserService, SnackerService, CreateUser } from 'src/app/core';
import { ErrorMessageService } from 'src/app/core/services/error-message.service';
import { MyErrorStateMatcher } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  roleSelected = Role.USER;
  credentials: FormGroup;
  submitted = false;
  hide = true;
  hide2 = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userSrv: UserService,
    private snacker: SnackerService,
    private route: ActivatedRoute,
    private errorMessage: ErrorMessageService
  ) {}

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', [Validators.required]],
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

    this.userSrv.create(newUser).subscribe(
      async () => {
        this.router.navigate(['..'], { relativeTo: this.route });
        const message =
          'Se ha enviado un email al nuevo usuario con sus credenciales para entrar en la app móvil.';
        this.snacker.openSuccessful(message);
      },
      async (error) => {
        const message = this.errorMessage.get(error);
        this.snacker.openError(message);
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
