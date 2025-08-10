import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { LoginRequest } from "../model/LoginRequest";
import { LoginResponse } from "../model/LoginResponse";

@Injectable({
  providedIn: "root",
})
export class LoginRemoteDatasource {
  private httpClient: HttpClient = inject(HttpClient);

  login(request: LoginRequest): Promise<LoginResponse> {
    const requestBody = {
      email: request.email,
      password: request.password,
    };

    return firstValueFrom(
      this.httpClient.post<LoginResponse>("/v1/auth/login", requestBody)
    );
  }
}
