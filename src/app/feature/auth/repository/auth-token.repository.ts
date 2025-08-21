import { Injectable, inject } from "@angular/core";
import { AuthTokenDatasource } from "../data-source/auth-token.datasource";

@Injectable({
  providedIn: "root",
})
export class AuthTokenRepository {
  private localDatasource = inject(AuthTokenDatasource);

  getTokens(): AuthTokens | null {
    return this.localDatasource.getTokens();
  }

  storeTokens(tokens: AuthTokens): void {
    this.localDatasource.storeTokens({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  }

  clearTokens(): void {
    this.localDatasource.clearTokens();
  }

  isLoggedIn(): boolean {
    return this.localDatasource.isLoggedIn();
  }
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
