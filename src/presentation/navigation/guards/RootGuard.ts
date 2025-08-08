import { CanActivateFn, Router } from "@angular/router";
import { AuthTokenRepository } from "../../../domain/login/repository/AuthTokenRepository";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = () => {
  const authRepository = inject(AuthTokenRepository);
  const router = inject(Router);
  const isLoggedIn = authRepository.isLoggedIn();

  if (isLoggedIn) {
    router.navigate(["/home"]);
  } else {
    router.navigate(["/login"]);
  }

  return true;
};
