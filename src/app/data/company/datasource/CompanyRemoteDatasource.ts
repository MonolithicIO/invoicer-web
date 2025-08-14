import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  ListCompaniesRequest,
  ListCompaniesResponse,
} from "../model/ListCompaniesRequest";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CompanyRemoteDatasource {
  private httpClient = inject(HttpClient);

  listCompanies(
    request: ListCompaniesRequest
  ): Observable<ListCompaniesResponse> {
    return this.httpClient.get<ListCompaniesResponse>("/v1/company", {
      params: {
        page: request.page,
        pageSize: request.pageSize,
      },
    });
  }
}
