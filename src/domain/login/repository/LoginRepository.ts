import { inject, Injectable } from "@angular/core";
import { LoginDataSource } from "../../../data/login/datasource/LoginDatasource";
import { LoginModel } from "../model/LoginModel";
import { LoginRequest } from "../../../data/login/model/LoginRequest";

@Injectable({
  providedIn: "root",
})
export class LoginRepository {
  private loginDatasource = inject(LoginDataSource);

  login(model: LoginModel) {
    const request: LoginRequest = {
      email: model.email,
      password: model.password,
    };

    return this.loginDatasource.login(request);
  }
}
