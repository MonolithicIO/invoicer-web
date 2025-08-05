import { Component, signal, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LoginRepository } from "../../domain/login/repository/LoginRepository";
import { ApiError } from "../../foundation/network/ApiError";

@Component({
  selector: "app-login-screen",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  imports: [RouterLink],
})
export class LoginComponent {
  private loginRepository = inject(LoginRepository);

  email = signal("");
  password = signal("");
  isButtonEnabled = computed(() => this.email() && this.password());

  onChangeEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email.set(input.value);
  }

  onChangePassword(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password.set(input.value);
  }

  onLoginWithGoogle() {
    alert("Login with Google is not implemented yet.");
  }

  onLogin() {
    this.loginRepository
      .login({
        email: this.email(),
        password: this.password(),
      })
      .subscribe({
        next: (response) => {
          alert(
            `Login successful! Token: ${response.token}, Refresh Token: ${response.refreshToken}`
          );
        },
        error: (error: ApiError) => {
          console.log(error);
          alert(`Login failed: ${error.message}`);
        },
      });
  }
}
