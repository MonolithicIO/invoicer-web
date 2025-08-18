import { Injectable } from "@angular/core";
import { SelectedCompany } from "../model/SelectedCompany";

@Injectable({ providedIn: "root" })
export class CompanyLocalDatasource {
  storeSelectedCompany(company: SelectedCompany) {
    localStorage.setItem("selectedCompany", JSON.stringify(company));
  }

  getSelectedCompany(): SelectedCompany | null {
    const company = localStorage.getItem("selectedCompany");
    return company ? JSON.parse(company) : null;
  }

  clearSelectedCompany() {
    localStorage.removeItem("selectedCompany");
  }
}
