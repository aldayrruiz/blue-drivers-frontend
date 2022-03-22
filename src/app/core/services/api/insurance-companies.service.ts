import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateInsuranceCompany, InsuranceCompany } from '../../models';
import { API } from '../../utils/api-paths.enum';

@Injectable({
  providedIn: 'root',
})
export class InsuranceCompanyService {
  private baseUrl = `${environment.baseURL}${API.INSURANCE_COMPANIES}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<InsuranceCompany[]> {
    const path = `${this.baseUrl}/`;
    return this.http.get<InsuranceCompany[]>(path);
  }

  get(id: string): Observable<InsuranceCompany> {
    const path = `${this.baseUrl}/${id}/`;
    return this.http.get<InsuranceCompany>(path);
  }

  create(company: CreateInsuranceCompany): Observable<InsuranceCompany> {
    const path = `${this.baseUrl}/`;
    return this.http.post<InsuranceCompany>(path, company);
  }

  update(id: string, company: CreateInsuranceCompany) {
    const path = `${this.baseUrl}/${id}/`;
    return this.http.put<InsuranceCompany>(path, company);
  }

  delete(id: string): Observable<void> {
    const path = `${this.baseUrl}/${id}/`;
    return this.http.delete<void>(path);
  }
}
