import { inject, Injectable } from "@angular/core";
import { RefreshLogin } from "../../domain/auth/model/RefreshLogin";
import { map, Observable } from "rxjs";
import { LoginRemoteDatasource } from "../data-source/login.datasource";

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

  refreshLogin(model: RefreshLogin): Observable<AuthTokenModel> {
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
