import { inject, Injectable } from "@angular/core";
import { CompanyRepository } from "../repository/CompanyRepository";
import { SelectedCompanyModel } from "../model/SelectedCompanyModel";

@Injectable({ providedIn: "root" })
export class SelectCompanyService {
  private repository = inject(CompanyRepository);

  selectCompany(company: SelectedCompanyModel): void {
    this.repository.selectCompany(company);
  }
}
