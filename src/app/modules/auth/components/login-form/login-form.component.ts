import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Tenant, UserRole } from '@core/models';
import { AssetsService, BlueDriversRouter, ErrorMessageService, LoginService, SnackerService, TenantService } from '@core/services';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';
import { userEmailValidators, userPasswordValidators } from '@core/validators/user';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  blueDriversLogo = '';
  matcher = new MyErrorStateMatcher();
  tenants: Tenant[] = [];
  isSuperAdmin = false;
  tenantToChange: string;
  credentials: FormGroup;
  hide = true;
  sending = false;

  constructor(
    private errorMessage: ErrorMessageService,
    private tenantService: TenantService,
    private assetsService: AssetsService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private snackerService: SnackerService,
    private fleetRouter: BlueDriversRouter
  ) {
    this.blueDriversLogo = this.assetsService.getUrl('background/icon.png');
  }

  get email(): FormControl {
    return this.credentials.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.credentials.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.credentials = this.formBuilder.group({
      email: ['', userEmailValidators],
      password: ['', userPasswordValidators],
      tenant: [],
    });
  }

  async login() {
    this.sending = true;
    const credentials = this.getFormData();

    this.loginService
      .login(credentials)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: async (response) => {
          if (response.role === UserRole.SUPER_ADMIN) {
            this.isSuperAdmin = true;
            this.tenantToChange = response.tenant.id;
            this.getTenants();
          } else if (response.role === UserRole.ADMIN) {
            this.fleetRouter.goToHome();
          } else {
            this.snackerService.showError('No eres administrador');
          }
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snackerService.showError(message);
        },
      });
  }

  getTenants() {
    this.tenantService.getAll().subscribe((tenants) => (this.tenants = tenants));
  }

  async changeTenant() {
    this.tenantService.changeTenant(this.tenantToChange).subscribe(() => this.fleetRouter.goToHome());
  }

  private getFormData() {
    // username is used instead of email because of server convert username to email by default at login.
    return {
      username: this.email.value,
      password: this.password.value,
    };
  }
}
