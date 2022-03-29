import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { InsuranceCompany } from 'src/app/core/models';
import { InsuranceCompanyService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class InsuranceCompaniesResolver implements Resolve<InsuranceCompany[]> {
  constructor(private insuranceCompanyService: InsuranceCompanyService) {}

  resolve(): Observable<InsuranceCompany[]> {
    return this.insuranceCompanyService.getAll();
  }
}
