import { Component, signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { IdentityLoginService } from "../../service/identity-login.service";
import { ApiError } from "../../../../../core/network/model/ApiError";

@Component({
  selector: "app-login-screen",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
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

  onGoToSignUP() {
    this.router.navigate(["/signup"]);
  }
}
