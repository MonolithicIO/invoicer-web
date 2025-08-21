import { inject, Injectable } from "@angular/core";
import { CompanyRepository } from "../repository/company.repository";

@Injectable({ providedIn: "root" })
export class SelectCompanyService {
  private repository = inject(CompanyRepository);

  selectCompany(company: SelectedCompanyDto): void {
    this.repository.selectCompany({
      id: company.id,
      name: company.name,
    });
  }
}

export interface SelectedCompanyDto {
  id: string;
  name: string;
}
