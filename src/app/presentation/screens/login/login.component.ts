import { Component, signal, computed, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ApiError } from "../../../network/ApiError";
import { IdentityLoginService } from "../../../domain/login/service/IdentityLoginService";

@Component({
  selector: "app-login-screen",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  imports: [RouterLink],
})
export class LoginComponent {
  private identityLoginService = inject(IdentityLoginService);

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
    this.identityLoginService
      .login({
        email: this.email(),
        password: this.password(),
      })
      .then(() => {
        alert(`Login successful!`);
      })
      .catch((error: ApiError) => {
        alert(error);
      });
  }
}
