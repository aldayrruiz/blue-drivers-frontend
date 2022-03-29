import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { InsuranceCompany } from 'src/app/core/models';
import { InsuranceCompanyService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class InsuranceCompanyResolver implements Resolve<InsuranceCompany> {
  constructor(private insuranceCompanyService: InsuranceCompanyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<InsuranceCompany> {
    const id = route.params['insuranceCompanyId'];
    return this.insuranceCompanyService.get(id);
  }
}
