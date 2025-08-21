import { inject, Injectable } from "@angular/core";
import { LoginModel } from "../../domain/auth/model/LoginModel";
import { LoginRequest } from "../../data/auth/model/LoginRequest";
import { RefreshLogin } from "../../domain/auth/model/RefreshLogin";
import { map, Observable } from "rxjs";
import { AuthTokenModel } from "../../domain/auth/model/AuthTokenModel";
import { LoginRemoteDatasource } from "../data-source/login.datasource";

@Injectable({
  providedIn: "root",
})
export class LoginRepository {
  private remoteDatasource = inject(LoginRemoteDatasource);

  login(model: LoginModel): Observable<AuthTokenModel> {
    const request: LoginRequest = {
      email: model.email,
      password: model.password,
    };

    return this.remoteDatasource.login(request).pipe(
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
