import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { LoginRequest } from "../model/LoginRequest";
import { LoginResponse } from "../model/LoginResponse";
import { RefreshLoginRequest } from "../model/RefreshLoginRequest";

@Injectable({
  providedIn: "root",
})
export class LoginRemoteDatasource {
  private httpClient: HttpClient = inject(HttpClient);

  login(request: LoginRequest): Promise<LoginResponse> {
    return firstValueFrom(
      this.httpClient.post<LoginResponse>("/v1/auth/login", request)
    );
  }

  refreshLogin(request: RefreshLoginRequest): Promise<LoginResponse> {
    return firstValueFrom(
      this.httpClient.post<LoginResponse>("/v1/auth/refresh", request)
    );
  }
}
