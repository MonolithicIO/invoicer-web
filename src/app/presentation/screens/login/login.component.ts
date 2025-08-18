import { Component, signal, computed, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ApiError } from "../../../../core/network/model/ApiError";
import { IdentityLoginService } from "../../../domain/login/service/IdentityLoginService";

@Component({
  selector: "app-login-screen",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  imports: [RouterLink],
})
export class LoginComponent {
  private identityLoginService = inject(IdentityLoginService);
  private router = inject(Router);

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
      .subscribe({
        next: () => {
          this.router.navigate(["/home"]);
        },
        error: (error: ApiError) => {
          alert(error.message);
        },
      });
  }
}
