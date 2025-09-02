import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CompanyLocalDatasource } from "../datasource/company-local.datasource";
import { CompanyRemoteDatasource } from "../datasource/company-remote.datasource";

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

  createCompany(request: CreateCompanyModel): Observable<void> {
    return this.companyRemoteDatasource.createCompany(request);
  }
}

export interface CompaniesListModel {
  companies: CompanyListItemModel[];
  total: number;
  nextPageIndex: number | null;
}

export interface CompanyListItemModel {
  document: string;
  name: string;
  id: string;
}

export interface SelectedCompanyModel {
  id: string;
  name: string;
}

export interface CreateCompanyModel {
  name: string;
  document: string;
  address: CreateCompanyAddressModel;
  paymentAccount: CreateCompanyPayAccountModel;
  intermediaryAccount: CreateCompanyPayAccountModel | null;
}

export interface CreateCompanyAddressModel {
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export interface CreateCompanyPayAccountModel {
  iban: string;
  swift: string;
  bankName: string;
  bankAddress: string;
}
