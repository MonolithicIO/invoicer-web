import { Injectable } from "@angular/core";

export interface PasswordStrength {
  lengthValid: boolean;
  uppercaseValid: boolean;
  lowercaseValid: boolean;
  numberValid: boolean;
  specialCharacterValid: boolean;
}

@Injectable({
  providedIn: "root",
})
export class PasswordStrengthChecker {
  check(password: string): PasswordStrength {
    const lengthValid = password.length >= 8;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /\d/.test(password);
    const specialCharacterValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      lengthValid,
      uppercaseValid,
      lowercaseValid,
      numberValid,
      specialCharacterValid,
    };
  }
}
