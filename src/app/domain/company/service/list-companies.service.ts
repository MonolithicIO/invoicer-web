import { inject, Injectable } from "@angular/core";
import { CompanyRepository } from "../repository/company.repository";

@Injectable({ providedIn: "root" })
export class ListCompaniesService {
  private companyRepository: CompanyRepository = inject(CompanyRepository);

  listCompanies(request: { page: number; limit: number }) {
    return this.companyRepository.listCompanies(request);
  }
}
