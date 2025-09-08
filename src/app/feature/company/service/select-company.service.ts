import { inject, Injectable } from "@angular/core";
import { CompanyRepository } from "../repository/company.repository";
import { SessionRefresherService } from "../../session/service/session-refresher.service";

@Injectable({ providedIn: "root" })
export class SelectCompanyService {
  private readonly repository = inject(CompanyRepository);
  private readonly sessionRefresher = inject(SessionRefresherService);

  selectCompany(company: SelectedCompanyDto): void {
    this.repository.selectCompany({
      id: company.id,
      name: company.name,
    });
    this.sessionRefresher.refreshSession();
  }
}

export interface SelectedCompanyDto {
  id: string;
  name: string;
}
