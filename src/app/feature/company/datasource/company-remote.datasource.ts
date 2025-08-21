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
