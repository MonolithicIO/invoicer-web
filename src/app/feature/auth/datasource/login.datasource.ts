import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginRemoteDatasource {
  private httpClient: HttpClient = inject(HttpClient);

  login(request: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>("/v1/auth/login", request);
  }

  refreshLogin(request: { refreshToken: string }): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>("/v1/auth/refresh", request);
  }
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
}
