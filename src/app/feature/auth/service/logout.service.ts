import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { AuthTokenRepository } from "../repository/auth-token.repository";
import { CompanyRepository } from "../../company/repository/company.repository";
import { SessionRefresherService } from "../../session/service/session-refresher.service";

@Injectable({ providedIn: "root" })
export class LogoutService {
  private readonly authTokenRepository = inject(AuthTokenRepository);
  private readonly companyRepository = inject(CompanyRepository);
  private readonly sessionRefresher = inject(SessionRefresherService);

  logout(): Observable<void> {
    this.authTokenRepository.clearTokens();
    this.companyRepository.clearSelectedCompany();
    this.sessionRefresher.refreshSession();
    return of(void 0);
  }
}
