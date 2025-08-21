import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AuthTokenRepository } from "../../../auth/repository/auth-token.repository";
import { CompanyRepository } from "../../feature/company/repository/company.repository";

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
