import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

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
  ],
})
export class SignUpComponent {
  email = signal("");
  confirmEmail = signal("");
  password = signal("");
  showPassword = signal(false);

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
    alert("hello world");
  }
}
