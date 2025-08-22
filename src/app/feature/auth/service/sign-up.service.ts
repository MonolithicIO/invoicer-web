import { inject, Injectable } from "@angular/core";
import { SignUpRepository } from "../repository/sign-up.repository";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SignUpService {
  private signUpRepository = inject(SignUpRepository);

  signUp(userData: {
    email: string;
    confirmEmail: string;
    password: string;
  }): Observable<void> {
    return new Observable((subscriber) => {
      this.signUpRepository.signUp(userData).subscribe({
        next: () => {
          subscriber.next();
        },
        error: (error) => subscriber.error(error),
      });
    });
  }
}
