import { Component, signal, inject } from "@angular/core";
import { Router } from "@angular/router";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { IdentityLoginService } from "../../service/identity-login.service";
import { ApiError } from "../../../../../core/network/model/ApiError";
import { merge } from "rxjs";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-login-screen",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class LoginComponent {
  private identityLoginService = inject(IdentityLoginService);
  private router = inject(Router);

  readonly loginFormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  private get emailControl() {
    return this.loginFormGroup.get("email") as FormControl;
  }

  private get passwordControl() {
    return this.loginFormGroup.get("password") as FormControl;
  }

  showPassword = signal(false);
  emailErrorText = signal("");
  passwordErrorText = signal("");

  constructor() {
    merge(
      this.emailControl.valueChanges,
      this.passwordControl.statusChanges
    ).subscribe(() => {
      this.setEmailError();
    });

    merge(
      this.passwordControl.valueChanges,
      this.passwordControl.statusChanges
    ).subscribe(() => {
      this.setPasswordError();
    });
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onLoginWithGoogle() {
    alert("Login with Google is not implemented yet.");
  }

  onLogin() {
    this.identityLoginService
      .login({
        email: this.emailControl.value,
        password: this.passwordControl.value,
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

  private setEmailError() {
    if (this.loginFormGroup.get("email")?.invalid) {
      this.emailErrorText.set("Invalid email");
    } else {
      this.emailErrorText.set("");
    }
  }

  private setPasswordError() {
    if (this.loginFormGroup.get("password")?.invalid) {
      this.passwordErrorText.set("Invalid password");
    } else {
      this.passwordErrorText.set("");
    }
  }
}
