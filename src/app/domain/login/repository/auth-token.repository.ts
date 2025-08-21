import { Injectable, inject } from "@angular/core";
import { AuthTokenDatasource } from "../../../data/login/datasource/AuthTokenDataSource";
import { AuthTokenResponse } from "../../../data/login/model/AuthTokenResponse";

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
