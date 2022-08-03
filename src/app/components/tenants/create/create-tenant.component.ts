import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {
  ErrorMessageService,
  FleetRouter,
  LocalStorage,
  SnackerService,
  TenantService,
  UserService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import { tenantNameValidators } from 'src/app/core/validators/tenant';
import { userEmailValidators, userFullnameValidators } from 'src/app/core/validators/user';
import { isEmail, required } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.css'],
})
export class CreateTenantComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  isLinear = false;
  adminForm: FormGroup;
  tenantForm: FormGroup;
  dietForm: FormGroup;
  sending = false;

  constructor(
    private tenantSrv: TenantService,
    private errorMessage: ErrorMessageService,
    private formBuilder: FormBuilder,
    private snacker: SnackerService,
    private storage: LocalStorage,
    private userSrv: UserService,
    private router: FleetRouter
  ) {}

  // Tenant form
  get tenantName(): AbstractControl {
    return this.tenantForm.get('tenantName');
  }

  get tenantLogo(): AbstractControl {
    return this.tenantForm.get('tenantLogo');
  }

  // Admin form
  get adminEmail(): AbstractControl {
    return this.adminForm.get('adminEmail');
  }

  get adminFullname(): AbstractControl {
    return this.adminForm.get('adminFullname');
  }

  // Diet
  get state(): AbstractControl {
    return this.dietForm.get('state');
  }

  get interventorEmail(): AbstractControl {
    return this.dietForm.get('interventorEmail');
  }

  get interventorFullname(): AbstractControl {
    return this.dietForm.get('interventorFullname');
  }

  get supervisorEmail(): AbstractControl {
    return this.dietForm.get('supervisorEmail');
  }

  get supervisorFullname(): AbstractControl {
    return this.dietForm.get('supervisorFullname');
  }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      adminEmail: ['', userEmailValidators],
      adminFullname: ['', userFullnameValidators],
    });

    this.dietForm = this.formBuilder.group({
      state: [false],
      interventorEmail: ['', isEmail],
      interventorFullname: [''],
      supervisorEmail: ['', isEmail],
      supervisorFullname: [''],
    });

    this.tenantForm = this.formBuilder.group({
      tenantName: ['', tenantNameValidators],
      tenantLogo: ['', required],
    });
  }

  create() {
    console.log(this.tenantForm.value);
    console.log(this.adminForm.value);
    console.log(this.dietForm.value);
  }

  async createTenant() {
    const { tenantName, tenantLogo } = this.tenantForm.value;
    const tenant = {
      name: tenantName,
      logo: await this.toBase64(tenantLogo),
    };
    this.tenantSrv.create(tenant).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
}
