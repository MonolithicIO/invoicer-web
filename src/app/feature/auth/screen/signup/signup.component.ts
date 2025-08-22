import { Component, inject, signal } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
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

  readonly signUpFormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    confirmEmail: new FormControl("", [
      Validators.required,
      Validators.email,
      this.emailWatchValidator.bind(this),
    ]),
    password: new FormControl("", [
      Validators.required,
      this.passwordStrengthValidator.bind(this),
    ]),
  });

  private get emailControl() {
    return this.signUpFormGroup.get("email") as FormControl;
  }

  private get confirmEmailControl() {
    return this.signUpFormGroup.get("confirmEmail") as FormControl;
  }

  private get passwordControl() {
    return this.signUpFormGroup.get("password") as FormControl;
  }

  private emailWatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value || !this.emailControl?.value) {
      return null;
    }

    return control.value === this.emailControl.value
      ? null
      : { emailMismatch: true };
  }

  private passwordStrengthValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const strength = this.passwordChecker.check(control.value ?? "");
    const isStrong = Object.keys(strength).every(
      (key) => strength[key as keyof PasswordStrength]
    );
    return isStrong ? null : { weak: true };
  }

  constructor() {
    merge(this.passwordControl.valueChanges).subscribe((value) => {
      const strength = this.passwordChecker.check(value ?? "");
      this.passwordStrength.set(strength);
      this.setPasswordErrorMessage();
    });

    merge(
      this.emailControl.valueChanges,
      this.emailControl.statusChanges
    ).subscribe(() => {
      this.setEmailErrorText();
    });

    merge(
      this.confirmEmailControl.valueChanges,
      this.confirmEmailControl.statusChanges,
      this.signUpFormGroup.statusChanges
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
    const email = this.emailControl.value ?? "";
    const confirmEmail = this.confirmEmailControl.value ?? "";
    const password = this.passwordControl.value ?? "";

    this.signUpService
      .signUp({
        email: email,
        confirmEmail: confirmEmail,
        password: password,
      })
      .subscribe({
        next: () => {
          alert("Sign up successful");
        },
        error: () => {
          alert("Sign up failed");
        },
      });
  }

  goToSignIn() {
    this.router.navigate(["login"]);
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
    } else if (this.confirmEmailControl.hasError("emailMismatch")) {
      this.confirmEmailErrorText.set("Emails do not match");
    } else {
      this.confirmEmailErrorText.set("");
    }
  }

  private setPasswordErrorMessage() {
    if (this.passwordControl.hasError("required")) {
      this.passwordErrorText.set("Password is required");
    } else if (this.passwordControl.hasError("weak")) {
      this.passwordErrorText.set("Password is weak");
    } else {
      this.passwordErrorText.set("");
    }
  }
}
