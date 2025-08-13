import { inject, Injectable } from "@angular/core";
import { LoginModel } from "../model/LoginModel";
import { AuthTokenModel } from "../model/AuthTokenModel";
import { LoginRequest } from "../../../data/login/model/LoginRequest";
import { LoginRemoteDatasource } from "../../../data/login/datasource/LoginRemoteDatasource";
import { RefreshLogin } from "../model/RefreshLogin";
import { map, Observable } from "rxjs";

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
