import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CompanyLocalDatasource {
  storeSelectedCompany(company: StoredSelectedCompany) {
    localStorage.setItem("selectedCompany", JSON.stringify(company));
  }

  getSelectedCompany(): StoredSelectedCompany | null {
    const company = localStorage.getItem("selectedCompany");
    return company ? JSON.parse(company) : null;
  }

  clearSelectedCompany() {
    localStorage.removeItem("selectedCompany");
  }
}

export interface StoredSelectedCompany {
  id: string;
  name: string;
}
