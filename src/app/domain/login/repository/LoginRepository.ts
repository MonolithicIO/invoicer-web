import { inject, Injectable } from "@angular/core";
import { LoginModel } from "../model/LoginModel";
import { AuthTokenModel } from "../model/AuthTokenModel";
import { LoginRequest } from "../../../data/login/model/LoginRequest";
import { LoginRemoteDatasource } from "../../../data/login/datasource/LoginRemoteDatasource";
import { RefreshLogin } from "../model/RefreshLogin";

@Injectable({
  providedIn: "root",
})
export class LoginRepository {
  private remoteDatasource = inject(LoginRemoteDatasource);

  async login(model: LoginModel): Promise<AuthTokenModel> {
    const request: LoginRequest = {
      email: model.email,
      password: model.password,
    };

    const result = await this.remoteDatasource.login(request);

    return Promise.resolve({
      accessToken: result.token,
      refreshToken: result.refreshToken,
    });
  }

  async refreshLogin(model: RefreshLogin): Promise<AuthTokenModel> {
    const result = await this.remoteDatasource.refreshLogin({
      refreshToken: model.refreshToken,
    });

    return Promise.resolve({
      accessToken: result.token,
      refreshToken: result.refreshToken,
    });
  }
}
