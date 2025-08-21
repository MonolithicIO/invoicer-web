import { inject, Injectable } from "@angular/core";
import { CompanyRepository } from "../repository/company.repository";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ListCompaniesService {
  private companyRepository: CompanyRepository = inject(CompanyRepository);

  listCompanies(request: {
    page: number;
    limit: number;
  }): Observable<CompaniesListDto> {
    return this.companyRepository.listCompanies(request);
  }
}

export interface CompaniesListDto {
  companies: CompanyListItemDto[];
  total: number;
  nextPageIndex: number | null;
}

export interface CompanyListItemDto {
  document: string;
  name: string;
  id: string;
}
