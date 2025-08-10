import { Injectable, inject } from "@angular/core";
import { LoginRepository } from "../repository/LoginRepository";
import { AuthTokenRepository } from "../repository/AuthTokenRepository";

@Injectable({ providedIn: "root" })
export class IdentityLoginService {
  private loginRepository = inject(LoginRepository);
  private authTokenRepository = inject(AuthTokenRepository);

  async login(login: { email: string; password: string }): Promise<void> {
    const loginResult = await this.loginRepository.login({
      email: login.email,
      password: login.password,
    });

    this.authTokenRepository.storeTokens({
      accessToken: loginResult.accessToken,
      refreshToken: loginResult.refreshToken,
    });
  }
}
