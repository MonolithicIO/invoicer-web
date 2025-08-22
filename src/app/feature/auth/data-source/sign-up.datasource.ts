import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SignUpDataSource {
  private client = inject(HttpClient);

  signUp(userData: {
    email: string;
    confirmEmail: string;
    password: string;
  }): Observable<SignUpResponse> {
    return this.client.post<SignUpResponse>("/v1/user", userData);
  }
}

export interface SignUpResponse {
  userID: string;
}
