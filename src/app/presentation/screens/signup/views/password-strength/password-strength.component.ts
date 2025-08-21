import { Component, Input } from "@angular/core";
import { PasswordStrength } from "../../../../../domain/login/service/password-strength-checker.service";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-password-strength",
  templateUrl: "./password-strength.component.html",
  styleUrls: ["./password-strength.component.css"],
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule],
})
export class PasswordStrengthComponent {
  @Input() passwordStrength: PasswordStrength = {
    lengthValid: false,
    uppercaseValid: false,
    lowercaseValid: false,
    numberValid: false,
    specialCharacterValid: false,
  };

  get criteriaList() {
    return [
      {
        label: "At least 8 characters",
        valid: this.passwordStrength.lengthValid,
        icon: this.passwordStrength.lengthValid ? "check_circle" : "cancel",
      },
      {
        label: "At least 1 uppercase letter",
        valid: this.passwordStrength.uppercaseValid,
        icon: this.passwordStrength.uppercaseValid ? "check_circle" : "cancel",
      },
      {
        label: "At least 1 lowercase letter",
        valid: this.passwordStrength.lowercaseValid,
        icon: this.passwordStrength.lowercaseValid ? "check_circle" : "cancel",
      },
      {
        label: "At least 1 number",
        valid: this.passwordStrength.numberValid,
        icon: this.passwordStrength.numberValid ? "check_circle" : "cancel",
      },
      {
        label: "At least 1 special character",
        valid: this.passwordStrength.specialCharacterValid,
        icon: this.passwordStrength.specialCharacterValid
          ? "check_circle"
          : "cancel",
      },
    ];
  }
}
