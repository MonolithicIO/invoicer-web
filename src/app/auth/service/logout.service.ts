import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CompanyRepository } from "../../company/repository/company.repository";
import { AuthTokenRepository } from "../repository/auth-token.repository";

@Injectable({ providedIn: "root" })
export class LogoutService {
  private authTokenRepository = inject(AuthTokenRepository);
  private companyRepository = inject(CompanyRepository);

  logout(): Observable<void> {
    this.authTokenRepository.clearTokens();
    this.companyRepository.clearSelectedCompany();
    return of(void 0);
  }
}
