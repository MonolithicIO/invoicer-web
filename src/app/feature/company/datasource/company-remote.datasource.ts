import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CompanyRemoteDatasource {
  private httpClient = inject(HttpClient);

  listCompanies(request: {
    page: number;
    pageSize: number;
  }): Observable<ListCompaniesResponse> {
    return this.httpClient.get<ListCompaniesResponse>("/v1/company", {
      params: {
        page: request.page,
        pageSize: request.pageSize,
      },
    });
  }

  createCompany(request: CreateCompanyRequest): Observable<void> {
    return this.httpClient.post<void>("/v1/company", request);
  }
}

export interface ListCompaniesResponse {
  companies: CompanyListResponseItem[];
  total: number;
  nextPageIndex: number | null;
}

export interface CompanyListResponseItem {
  document: string;
  name: string;
  id: string;
}

export interface CreateCompanyRequest {
  name: string;
  document: string;
  address: CreateCompanyAddressRequest;
  paymentAccount: CreateCompanyPayAccountRequest;
  intermediaryAccount: CreateCompanyPayAccountRequest | null;
}

export interface CreateCompanyAddressRequest {
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export interface CreateCompanyPayAccountRequest {
  iban: string;
  swift: string;
  bankName: string;
  bankAddress: string;
}
