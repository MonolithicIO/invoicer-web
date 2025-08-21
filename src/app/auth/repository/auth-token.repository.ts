import { Injectable, inject } from "@angular/core";
import { AuthTokenResponse } from "../../data/auth/model/AuthTokenResponse";
import { AuthTokenDatasource } from "../data-source/auth-token.datasource";

@Injectable({
  providedIn: "root",
})
export class AuthTokenRepository {
  private localDatasource = inject(AuthTokenDatasource);

  getTokens(): AuthTokenResponse | null {
    return this.localDatasource.getTokens();
  }

  storeTokens(tokens: AuthTokenResponse): void {
    this.localDatasource.storeTokens(tokens);
  }

  clearTokens(): void {
    this.localDatasource.clearTokens();
  }

  isLoggedIn(): boolean {
    return this.localDatasource.isLoggedIn();
  }
}
