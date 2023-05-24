import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CreateUser, Tenant, UserRole } from '@core/models';
import { SnackerService, TenantService, UserService } from '@core/services';
import { ImageService } from '@core/services/image/image.service';
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
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  adminForm: FormGroup;
  tenantForm: FormGroup;
  dietForm: FormGroup;
  sending: boolean = false;

  constructor(
    private tenantSrv: TenantService,
    private formBuilder: FormBuilder,
    private snackerService: SnackerService,
    private userSrv: UserService,
    private imageUploader: ImageService
  ) {}

  // Tenant form
  get tenantName(): FormControl {
    return this.tenantForm.get('tenantName') as FormControl;
  }

  get tenantLogo(): FormControl {
    return this.tenantForm.get('tenantLogo') as FormControl;
  }

  // Admin form 1
  get adminEmail1(): FormControl {
    return this.adminForm.get('adminEmail1') as FormControl;
  }

  get adminFullname1(): FormControl {
    return this.adminForm.get('adminFullname1') as FormControl;
  }

  // Admin form 2
  get adminEmail2(): FormControl {
    return this.adminForm.get('adminEmail2') as FormControl;
  }

  get adminFullname2(): FormControl {
    return this.adminForm.get('adminFullname2') as FormControl;
  }

  // Diet
  get dietState(): FormControl {
    return this.dietForm.get('dietState') as FormControl;
  }

  get interventorEmail(): FormControl {
    return this.dietForm.get('interventorEmail') as FormControl;
  }

  get interventorFullname(): FormControl {
    return this.dietForm.get('interventorFullname') as FormControl;
  }

  get supervisorEmail(): FormControl {
    return this.dietForm.get('supervisorEmail') as FormControl;
  }

  get supervisorFullname(): FormControl {
    return this.dietForm.get('supervisorFullname') as FormControl;
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
    const tenant: Tenant = await this.getTenantData();
    this.tenantSrv.create(tenant).subscribe({
      next: (tenantCreated) => {
        this.snackerService.showSuccessful('Tenant created');
        this.createAdmin(tenantCreated.id);
        this.createSupervisorAndInterventor(tenantCreated.id);
      },
    });
  }

  private createAdmin(tenantId: string) {
    const admin1: CreateUser = this.getAdminData1(tenantId);
    const admin2: CreateUser = this.getAdminData2(tenantId);
    this.userSrv.create(admin1).subscribe({
      next: () => {
        this.snackerService.showSuccessful('Se ha creado y enviado un email al administrador');
      },
    });

    if (!admin2.email || !admin2.fullname) {
      return;
    }

    this.userSrv.create(admin2).subscribe({
      next: () => {
        this.snackerService.showSuccessful('Se ha creado y enviado un email al administrador');
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
        this.snackerService.showSuccessful('Interventor created');
      },
    });
    this.userSrv.create(supervisor).subscribe({
      next: () => {
        this.snackerService.showSuccessful('Supervisor created');
      },
    });
  }

  private async getTenantData(): Promise<Tenant> {
    const { tenantName, tenantLogo } = this.tenantForm.value;
    const { dietState } = this.dietForm.value;
    const logo = await this.imageUploader.toBase64(tenantLogo);
    const name = tenantName;
    const diet = dietState;
    return { name, logo, diet };
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
}
