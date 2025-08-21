import { inject, Injectable } from "@angular/core";
import { CompanyRemoteDatasource } from "../../../data/company/datasource/CompanyRemoteDatasource";
import { CompaniesListModel } from "../model/CompaniesListModel";
import { Observable } from "rxjs";
import { CompanyLocalDatasource } from "../../../data/company/datasource/CompanyLocalDatasource";
import { SelectedCompanyModel } from "../model/SelectedCompanyModel";

@Injectable({ providedIn: "root" })
export class CompanyRepository {
  private companyRemoteDatasource: CompanyRemoteDatasource = inject(
    CompanyRemoteDatasource
  );

  private companyLocalDatasource = inject(CompanyLocalDatasource);

  listCompanies(request: {
    page: number;
    limit: number;
  }): Observable<CompaniesListModel> {
    return this.companyRemoteDatasource.listCompanies({
      page: request.page,
      pageSize: request.limit,
    });
  }

  selectCompany(company: SelectedCompanyModel) {
    this.companyLocalDatasource.storeSelectedCompany(company);
  }

  getSelectedCompany(): SelectedCompanyModel | null {
    return this.companyLocalDatasource.getSelectedCompany();
  }

  clearSelectedCompany() {
    this.companyLocalDatasource.clearSelectedCompany();
  }
}
