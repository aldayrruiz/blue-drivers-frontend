import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CreateInsuranceCompany } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  InsuranceCompanyService,
  SnackerService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import { nameValidators, phoneValidators } from 'src/app/core/validators/insurance-company';

@Component({
  selector: 'app-create-insurance-company',
  templateUrl: './create-insurance-company.component.html',
  styleUrls: ['./create-insurance-company.component.css'],
})
export class CreateInsuranceCompanyComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  company: FormGroup;
  sending = false;

  constructor(
    private insuranceCompanySrv: InsuranceCompanyService,
    private errorMessage: ErrorMessageService,
    private formBuilder: FormBuilder,
    private snacker: SnackerService,
    private router: FleetRouter
  ) {}

  ngOnInit(): void {
    this.company = this.formBuilder.group({
      name: ['', nameValidators],
      phone: ['', phoneValidators],
    });
  }

  private getFormData(): CreateInsuranceCompany {
    const company = {
      name: this.name.value,
      phone: this.phone.value,
    };
    return company;
  }

  create(): void {
    const company = this.getFormData();
    this.sending = true;

    this.insuranceCompanySrv
      .create(company)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => {
          this.router.goToInsuranceCompanies();
          this.snacker.showSuccessful('Compañía aseguradora creada con éxito');
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        }
      );
  }

  get name(): AbstractControl {
    return this.company.get('name');
  }

  get phone(): AbstractControl {
    return this.company.get('phone');
  }
}
