import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CreateInsuranceCompany, InsuranceCompany } from 'src/app/core/models';
import {
  ErrorMessageService,
  FleetRouter,
  InsuranceCompanyService,
  SnackerService,
} from 'src/app/core/services';
import { MyErrorStateMatcher } from 'src/app/core/utils/my-error-state-matcher';
import { insuranceCompanyNameValidators, insuranceCompanyPhoneValidators } from 'src/app/core/validators/insurance-company';

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
    private snacker: SnackerService,
    private route: ActivatedRoute,
    private router: FleetRouter
  ) {}

  ngOnInit(): void {
    this.resolve();
    this.setFormGroup(this.oldCompany);
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
          this.snacker.showSuccessful(message);
        },
        async (error) => {
          const message = this.errorMessage.get(error);
          this.snacker.showError(message);
        }
      );
  }

  resolve(): void {
    this.route.data.subscribe((response) => {
      this.oldCompany = response.vehicle;
    });
  }

  get name(): AbstractControl {
    return this.company.get('name');
  }

  get phone(): AbstractControl {
    return this.company.get('phone');
  }
}
