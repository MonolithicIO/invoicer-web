import { inject, Injectable } from "@angular/core";

import { map, Observable } from "rxjs";
import { LoginRemoteDatasource } from "../datasource/login.datasource";

@Injectable({
  providedIn: "root",
})
export class LoginRepository {
  private remoteDatasource = inject(LoginRemoteDatasource);

  login(model: {
    email: string;
    password: string;
  }): Observable<AuthTokenModel> {
    return this.remoteDatasource
      .login({
        email: model.email,
        password: model.password,
      })
      .pipe(
        map((response) => ({
          accessToken: response.token,
          refreshToken: response.refreshToken,
        }))
      );
  }

  refreshLogin(model: { refreshToken: string }): Observable<AuthTokenModel> {
    return this.remoteDatasource
      .refreshLogin({
        refreshToken: model.refreshToken,
      })
      .pipe(
        map((response) => ({
          accessToken: response.token,
          refreshToken: response.refreshToken,
        }))
      );
  }
}

export interface AuthTokenModel {
  accessToken: string;
  refreshToken: string;
}
