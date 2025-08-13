import { Injectable, inject } from "@angular/core";
import { LoginRepository } from "../repository/LoginRepository";
import { AuthTokenRepository } from "../repository/AuthTokenRepository";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class IdentityLoginService {
  private loginRepository = inject(LoginRepository);
  private authTokenRepository = inject(AuthTokenRepository);

  login(login: { email: string; password: string }): Observable<void> {
    return new Observable((observer) => {
      this.loginRepository
        .login({
          email: login.email,
          password: login.password,
        })
        .subscribe({
          next: (loginResult) => {
            this.authTokenRepository.storeTokens({
              accessToken: loginResult.accessToken,
              refreshToken: loginResult.refreshToken,
            });
            observer.next();
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          },
        });
    });
  }
}
