import { Component, inject, signal } from "@angular/core";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import {
  PasswordStrength,
  PasswordStrengthChecker,
} from "../../service/password-strength-checker.service";
import { PasswordStrengthComponent } from "./views/password-strength/password-strength.component";
import { SignUpService } from "../../service/sign-up.service";
import { merge } from "rxjs";

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
    ReactiveFormsModule,
  ],
})
export class SignUpComponent {
  private signUpService = inject(SignUpService);
  private router = inject(Router);
  private passwordChecker = inject(PasswordStrengthChecker);

  readonly emailControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  readonly confirmEmailControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  readonly passwordControl = new FormControl("", [Validators.required]);

  constructor() {
    merge(this.passwordControl.valueChanges).subscribe((value) => {
      const strength = this.passwordChecker.check(value ?? "");
      this.passwordStrength.set(strength);
      this.setPasswordErrorMessage(strength);
    });

    merge(
      this.emailControl.valueChanges,
      this.emailControl.statusChanges
    ).subscribe(() => {
      this.setEmailErrorText();
    });

    merge(
      this.confirmEmailControl.valueChanges,
      this.confirmEmailControl.statusChanges
    ).subscribe(() => {
      this.setConfirmEmailErrorText();
    });
  }

  showPassword = signal(false);
  emailErrorText = signal("");
  confirmEmailErrorText = signal("");
  passwordErrorText = signal("");
  passwordStrength = signal<PasswordStrength>(
    this.passwordChecker.check(this.passwordControl.value ?? "")
  );

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    // this.signUpService
    //   .signUp({
    //     email: this.email(),
    //     confirmEmail: this.confirmEmail(),
    //     password: this.password(),
    //   })
    //   .subscribe({
    //     next: () => {
    //       alert("Sign up successful");
    //     },
    //     error: () => {
    //       alert("Sign up failed");
    //     },
    //   });
  }

  goToSignIn() {
    this.router.navigate(["login"]);
  }

  onConfirmEmailBlur() {
    const email = this.emailControl.value;
    const confirmEmail = this.confirmEmailControl.value;

    if (email !== confirmEmail) {
      this.confirmEmailErrorText.set("Emails do not match");
    } else {
      this.confirmEmailErrorText.set("");
    }
  }

  private setEmailErrorText() {
    if (this.emailControl.hasError("required")) {
      this.emailErrorText.set("Email is required");
    } else if (this.emailControl.hasError("email")) {
      this.emailErrorText.set("Invalid email format");
    } else {
      this.emailErrorText.set("");
    }
  }

  private setConfirmEmailErrorText() {
    if (this.confirmEmailControl.hasError("required")) {
      this.confirmEmailErrorText.set("Confirm Email is required");
    } else if (this.confirmEmailControl.hasError("email")) {
      this.confirmEmailErrorText.set("Invalid email format");
    } else {
      this.confirmEmailErrorText.set("");
    }
  }

  private setPasswordErrorMessage(strength: PasswordStrength) {
    const isPasswordStrong = Object.keys(strength).every((key) => {
      return strength[key as keyof PasswordStrength] === true;
    });
    this.passwordControl.setErrors(isPasswordStrong ? null : { weak: true });

    if (this.passwordControl.hasError("required")) {
      this.passwordErrorText.set("Password is required");
    } else if (this.passwordControl.hasError("weak")) {
      this.passwordErrorText.set("Password is weak");
    } else {
      this.passwordErrorText.set("");
    }
  }
}
