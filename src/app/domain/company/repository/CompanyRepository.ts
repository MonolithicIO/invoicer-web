import { inject, Injectable } from "@angular/core";
import { CompanyRemoteDatasource } from "../../../data/company/datasource/CompanyRemoteDatasource";
import { CompaniesListModel } from "../model/CompaniesListModel";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CompanyRepository {
  private companyRemoteDatasource: CompanyRemoteDatasource = inject(
    CompanyRemoteDatasource
  );

  listCompanies(request: {
    page: number;
    limit: number;
  }): Observable<CompaniesListModel> {
    return this.companyRemoteDatasource.listCompanies({
      page: request.page,
      pageSize: request.limit,
    });
  }
}
