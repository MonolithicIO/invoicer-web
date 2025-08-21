import { Injectable } from "@angular/core";
import { AuthTokenResponse } from "../../data/auth/model/AuthTokenResponse";

@Injectable({
  providedIn: "root",
})
export class AuthTokenDatasource {
  storeTokens(tokens: AuthTokenResponse): void {
    sessionStorage.setItem("accessToken", tokens.accessToken);
    sessionStorage.setItem("refreshToken", tokens.refreshToken);
  }

  getTokens(): AuthTokenResponse | null {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      return {
        accessToken,
        refreshToken,
      };
    }

    return null;
  }

  clearTokens(): void {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  }

  isLoggedIn(): boolean {
    return this.getTokens() !== null;
  }
}
