import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { CreateUser, Tenant, UserRole } from '@core/models';
import { SnackerService, TenantService, UserService } from '@core/services';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';
import { tenantNameValidators } from '@core/validators/tenant';
import { userEmailValidators, userFullnameValidators } from '@core/validators/user';
import { isEmail, required } from '@core/validators/validators';

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
    private formBuilder: FormBuilder,
    private snacker: SnackerService,
    private userSrv: UserService
  ) {}

  // Tenant form
  get tenantName(): AbstractControl {
    return this.tenantForm.get('tenantName');
  }

  get tenantLogo(): AbstractControl {
    return this.tenantForm.get('tenantLogo');
  }

  // Admin form 1
  get adminEmail1(): AbstractControl {
    return this.adminForm.get('adminEmail1');
  }

  get adminFullname1(): AbstractControl {
    return this.adminForm.get('adminFullname1');
  }

  // Admin form 2
  get adminEmail2(): AbstractControl {
    return this.adminForm.get('adminEmail2');
  }

  get adminFullname2(): AbstractControl {
    return this.adminForm.get('adminFullname2');
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
      adminEmail1: ['', userEmailValidators],
      adminFullname1: ['', userFullnameValidators],
      adminEmail2: ['', [isEmail]],
      adminFullname2: ['', []],
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
    const admin1 = this.getAdminData1(tenantId);
    const admin2 = this.getAdminData2(tenantId);
    this.userSrv.create(admin1).subscribe({
      next: () => {
        this.snacker.showSuccessful('Se creado y enviado un email al administrador');
      },
    });

    if (!admin2.email || !admin2.fullname) {
      return;
    }

    this.userSrv.create(admin2).subscribe({
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

  private getAdminData1(tenant: string): CreateUser {
    const { adminEmail1, adminFullname1 } = this.adminForm.value;
    const email = adminEmail1;
    const fullname = adminFullname1;
    const role = UserRole.ADMIN;
    const ble_user_id = '';
    return { email, fullname, role, tenant, ble_user_id };
  }

  private getAdminData2(tenant: string): CreateUser {
    const { adminEmail2, adminFullname2 } = this.adminForm.value;
    const email = adminEmail2;
    const fullname = adminFullname2;
    const role = UserRole.ADMIN;
    const ble_user_id = '';
    return { email, fullname, role, tenant, ble_user_id };
  }

  private getSupervisorData(tenant: string): CreateUser {
    const { supervisorEmail, supervisorFullname } = this.dietForm.value;
    const email = supervisorEmail;
    const fullname = supervisorFullname;
    const role = UserRole.USER;
    const ble_user_id = '';
    const is_supervisor = true;
    return { email, fullname, role, tenant, ble_user_id, is_supervisor };
  }

  private getInterventorData(tenant: string): CreateUser {
    const { interventorEmail, interventorFullname } = this.dietForm.value;
    const email = interventorEmail;
    const fullname = interventorFullname;
    const role = UserRole.USER;
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
