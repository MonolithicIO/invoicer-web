import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginRequest } from "../model/LoginRequest";
import { LoginResponse } from "../model/LoginResponse";
import { RefreshLoginRequest } from "../model/RefreshLoginRequest";

@Injectable({
  providedIn: "root",
})
export class LoginRemoteDatasource {
  private httpClient: HttpClient = inject(HttpClient);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>("/v1/auth/login", request);
  }

  refreshLogin(request: RefreshLoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>("/v1/auth/refresh", request);
  }
}
