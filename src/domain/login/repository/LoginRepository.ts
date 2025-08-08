import { inject, Injectable } from "@angular/core";
import { LoginRemoteDatasource } from "../../../data/login/datasource/LoginRemoteDatasource";
import { LoginModel } from "../model/LoginModel";
import { LoginRequest } from "../../../data/login/model/LoginRequest";
import { AuthTokenModel } from "../model/AuthTokenModel";

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
}
