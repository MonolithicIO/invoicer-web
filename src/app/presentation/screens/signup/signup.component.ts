import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { PasswordStrengthChecker } from "../../../domain/login/service/password-strength-checker.service";
import { PasswordStrengthComponent } from "./views/password-strength/password-strength.component";

@Component({
  selector: "app-signup-screen",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    PasswordStrengthComponent,
  ],
})
export class SignUpComponent {
  email = signal("");
  confirmEmail = signal("");
  showPassword = signal(false);
  password = signal("");
  passwordStrength = computed(() => {
    const newStrength = this.passwordChecker.check(this.password());
    return newStrength;
  });

  private router = inject(Router);
  private passwordChecker = inject(PasswordStrengthChecker);

  onChangeEmail(event: Event) {
    const input = event.target as HTMLInputElement;

    this.email.set(input.value);
  }

  onChangeConfirmEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.confirmEmail.set(input.value);
  }

  onChangePassword(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password.set(input.value);
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    alert(this.password());
  }

  goToSignIn() {
    this.router.navigate(["login"]);
  }
}
