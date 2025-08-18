import { inject, Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { AuthTokenRepository } from "../repository/AuthTokenRepository";
import { CompanyRepository } from "../../company/repository/CompanyRepository";

@Injectable({ providedIn: "root" })
export class LogoutService {
  private authTokenRepository = inject(AuthTokenRepository);
  private companyRepository = inject(CompanyRepository);

  logout(): Observable<void> {
    this.authTokenRepository.clearTokens();
    this.companyRepository.clearSelectedCompany();
    return EMPTY;
  }
}
