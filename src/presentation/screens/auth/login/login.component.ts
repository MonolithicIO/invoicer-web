import { Component, signal, computed } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login-screen",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  imports: [RouterLink],
})
export class LoginComponent {
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

  onLogin() {
    alert(`Email: ${this.email()}, Password: ${this.password()}`);
  }

  onLoginWithGoogle() {
    alert("Login with Google is not implemented yet.");
  }
}
