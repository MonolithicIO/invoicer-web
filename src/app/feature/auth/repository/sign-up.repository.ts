import { inject, Injectable } from "@angular/core";
import { SignUpDataSource } from "../data-source/sign-up.datasource";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SignUpRepository {
  private dataSource = inject(SignUpDataSource);

  signUp(userData: {
    email: string;
    confirmEmail: string;
    password: string;
  }): Observable<SignUpResult> {
    return this.dataSource.signUp(userData);
  }
}

export interface SignUpResult {
  userID: string;
}
