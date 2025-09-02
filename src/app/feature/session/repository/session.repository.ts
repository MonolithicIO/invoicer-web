import { inject, Injectable } from "@angular/core";
import { CompanyLocalDatasource } from "../../company/datasource/company-local.datasource";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SessionRepository {
  private readonly companyDatasource = inject(CompanyLocalDatasource);

  private readonly currentCompany =
    new BehaviorSubject<SessionCompanyModel | null>(null);

  refreshSession() {
    this.currentCompany.next(this.companyDatasource.getSelectedCompany());
  }

  getCurrentCompany(): Observable<SessionCompanyModel | null> {
    return this.currentCompany.asObservable();
  }
}

export interface SessionCompanyModel {
  id: string;
  name: string;
}
