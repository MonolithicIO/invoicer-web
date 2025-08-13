import { Injectable, inject } from "@angular/core";
import { LoginRepository } from "../repository/LoginRepository";
import { AuthTokenRepository } from "../repository/AuthTokenRepository";

@Injectable({ providedIn: "root" })
export class RefreshTokenService {
  private repository: LoginRepository = inject(LoginRepository);
  private authTokenRepository: AuthTokenRepository =
    inject(AuthTokenRepository);

  async refreshToken(refreshToken: string): Promise<void> {
    const tokens = await this.repository.refreshLogin({ refreshToken });

    this.authTokenRepository.storeTokens({
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
    });
  }
}
