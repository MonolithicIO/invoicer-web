import { Injectable, inject } from "@angular/core";

import { Observable } from "rxjs";
import { LoginRepository } from "../repository/login.repository";
import { AuthTokenRepository } from "../repository/auth-token.repository";

@Injectable({ providedIn: "root" })
export class RefreshTokenService {
  private repository: LoginRepository = inject(LoginRepository);
  private authTokenRepository: AuthTokenRepository =
    inject(AuthTokenRepository);

  refreshToken(refreshToken: string): Observable<LoginResult> {
    return new Observable((observer) => {
      this.repository.refreshLogin({ refreshToken }).subscribe({
        next: (tokens) => {
          this.authTokenRepository.storeTokens({
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
          });
          observer.next({
            refreshToken: tokens.refreshToken,
            token: tokens.accessToken,
          });
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        },
      });
    });
  }
}

export interface LoginResult {
  refreshToken: string;
  token: string;
}
