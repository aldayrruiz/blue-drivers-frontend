import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CreateInsuranceCompany } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, InsuranceCompanyService, SnackerService } from '@core/services';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';
import { insuranceCompanyNameValidators, insuranceCompanyPhoneValidators } from '@core/validators/insurance-company';
import { finalize } from 'rxjs/operators';

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
    private snackerService: SnackerService,
    private router: BlueDriversRouter
  ) {}

  get name(): FormControl {
    return this.company.get('name') as FormControl;
  }

  get phone(): FormControl {
    return this.company.get('phone') as FormControl;
  }

  ngOnInit(): void {
    this.company = this.formBuilder.group({
      name: ['', insuranceCompanyNameValidators],
      phone: ['', insuranceCompanyPhoneValidators],
    });
  }

  create(): void {
    const company = this.getFormData();
    this.sending = true;

    this.insuranceCompanySrv
      .create(company)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: async () => {
          this.router.goToInsuranceCompanies();
          this.snackerService.showSuccessful('Compañía aseguradora creada con éxito');
        },
        error: async (error) => {
          const message = this.errorMessage.get(error);
          this.snackerService.showError(message);
        },
      });
  }

  private getFormData(): CreateInsuranceCompany {
    const company = {
      name: this.name.value,
      phone: this.phone.value,
    };
    return company;
  }
}
