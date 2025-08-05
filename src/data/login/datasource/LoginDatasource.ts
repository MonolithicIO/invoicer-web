import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginRequest } from "../model/LoginRequest";
import { LoginResponse } from "../model/LoginResponse";

@Injectable({
  providedIn: "root",
})
export class LoginDataSource {
  private httpClient: HttpClient = inject(HttpClient);

  login(request: LoginRequest): Observable<LoginResponse> {
    const requestBody = {
      email: request.email,
      password: request.password,
    };

    return this.httpClient.post<LoginResponse>("/v1/auth/login", requestBody);
  }
}
