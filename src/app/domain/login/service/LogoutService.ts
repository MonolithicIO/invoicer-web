import { inject } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { AuthTokenRepository } from "../repository/AuthTokenRepository";

export class LogoutService {
  private authTokenRepository = inject(AuthTokenRepository);

  logout(): Observable<void> {
    this.authTokenRepository.clearTokens();
    return EMPTY;
  }
}
