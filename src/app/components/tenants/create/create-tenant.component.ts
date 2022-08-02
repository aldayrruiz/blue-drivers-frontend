import { AbstractType, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {
  ErrorMessageService,
  FleetRouter,
  LocalStorage,
  SnackerService,
  UserService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import { tenantNameValidators } from 'src/app/core/validators/tenant';

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.css'],
})
export class CreateTenantComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  tenantForm: FormGroup;
  adminForm: FormGroup;
  dietForm: FormGroup;
  sending = false;

  constructor(
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
    return  this.tenantForm.get('tenantLogo');
  }

  // Admin form
  get adminEmail(): AbstractControl {
    return this.adminForm.get('adminEmail');
  }

  get adminFullname(): AbstractControl {
    return this.adminForm.get('adminFullname');
  }

  // Diet
  get diet(): AbstractControl {
    return this.dietForm.get('diet');
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
    this.tenantForm = this.formBuilder.group({
      name: ['', tenantNameValidators],
    });
  }
}
