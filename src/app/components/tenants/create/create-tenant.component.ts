/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { CreateUser, Role, Tenant } from 'src/app/core/models';
import {
  BlueDriversRouter,
  ErrorMessageService,
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
    private router: BlueDriversRouter
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
  get dietState(): AbstractControl {
    return this.dietForm.get('dietState');
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
      dietState: [false],
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

  async createTenant() {
    const tenant = await this.getTenantData();
    this.tenantSrv.create(tenant).subscribe({
      next: (tenantCreated) => {
        this.snacker.showSuccessful('Tenant created');
        this.createAdmin(tenantCreated.id);
        this.createSupervisorAndInterventor(tenantCreated.id);
      },
    });
  }

  private createAdmin(tenantId: string) {
    const admin = this.getAdminData(tenantId);
    this.userSrv.create(admin).subscribe({
      next: () => {
        this.snacker.showSuccessful('Se creado y enviado un email al administrador');
      },
    });
  }

  private createSupervisorAndInterventor(tenantId: string) {
    if (!this.dietState) {
      return;
    }

    const interventor = this.getInterventorData(tenantId);
    const supervisor = this.getSupervisorData(tenantId);
    this.userSrv.create(interventor).subscribe({
      next: () => {
        this.snacker.showSuccessful('Interventor created');
      },
    });
    this.userSrv.create(supervisor).subscribe({
      next: () => {
        this.snacker.showSuccessful('Supervisor created');
      },
    });
  }

  private async getTenantData(): Promise<Tenant> {
    const { tenantName, tenantLogo } = this.tenantForm.value;
    const { dietState } = this.dietForm.value;
    const logo = await this.toBase64(tenantLogo);
    const name = tenantName;
    const diet = dietState;
    const tenant = { name, logo, diet };
    return tenant;
  }

  private getAdminData(tenant: string): CreateUser {
    const { adminEmail, adminFullname } = this.adminForm.value;
    const email = adminEmail;
    const fullname = adminFullname;
    const role = Role.ADMIN;
    const ble_user_id = '';
    return { email, fullname, role, tenant, ble_user_id };
  }

  private getSupervisorData(tenant: string): CreateUser {
    const { supervisorEmail, supervisorFullname } = this.dietForm.value;
    const email = supervisorEmail;
    const fullname = supervisorFullname;
    const role = Role.USER;
    const ble_user_id = '';
    const is_supervisor = true;
    return { email, fullname, role, tenant, ble_user_id, is_supervisor };
  }

  private getInterventorData(tenant: string): CreateUser {
    const { interventorEmail, interventorFullname } = this.dietForm.value;
    const email = interventorEmail;
    const fullname = interventorFullname;
    const role = Role.USER;
    const ble_user_id = '';
    const is_interventor = true;
    return { email, fullname, role, tenant, ble_user_id, is_interventor };
  }

  private toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
}
