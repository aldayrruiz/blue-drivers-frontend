import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateInsuranceCompany, InsuranceCompany } from '@core/models';
import { BlueDriversRouter, ErrorMessageService, InsuranceCompanyService, SnackerService } from '@core/services';
import { MyErrorStateMatcher } from '@core/utils/my-error-state-matcher';
import { insuranceCompanyNameValidators, insuranceCompanyPhoneValidators } from '@core/validators/insurance-company';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-insurance-company',
  templateUrl: './edit-insurance-company.component.html',
  styleUrls: ['./edit-insurance-company.component.css'],
})
export class EditInsuranceCompanyComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  oldCompany: InsuranceCompany;
  company: FormGroup;
  sending = false;

  constructor(
    private insuranceCompanySrv: InsuranceCompanyService,
    private errorMessage: ErrorMessageService,
    private formBuilder: FormBuilder,
    private snackerService: SnackerService,
    private route: ActivatedRoute,
    private router: BlueDriversRouter
  ) {}

  get name(): FormControl {
    return this.company.get('name') as FormControl;
  }

  get phone(): FormControl {
    return this.company.get('phone') as FormControl;
  }

  ngOnInit(): void {
    this.resolve();
    this.setFormGroup(this.oldCompany);
  }

  async edit() {
    this.sending = true;
    const updatedData = this.getUpdatedData();

    this.insuranceCompanySrv
      .update(this.oldCompany.id, updatedData)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe(
        async () => {
          this.router.goToInsuranceCompanies();
          const message = 'Compañía aseguradora editada con éxito';
          this.snackerService.showSuccessful(message);
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snackerService.showError(message);
        }
      );
  }

  private setFormGroup(company: InsuranceCompany) {
    this.company = this.formBuilder.group({
      name: [company.name, insuranceCompanyNameValidators],
      phone: [company.phone, insuranceCompanyPhoneValidators],
    });
  }

  private getUpdatedData(): CreateInsuranceCompany {
    const updatedData = {
      name: this.name.value,
      phone: this.phone.value,
    };
    return updatedData;
  }

  private resolve(): void {
    this.route.data.subscribe((response) => {
      this.oldCompany = response.vehicle;
    });
  }
}
