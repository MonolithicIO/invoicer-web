import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResponse } from "../../data/auth/model/LoginResponse";
import { RefreshLoginRequest } from "../../data/auth/model/RefreshLoginRequest";
import { LoginRequest } from "../../data/auth/model/LoginRequest";

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
