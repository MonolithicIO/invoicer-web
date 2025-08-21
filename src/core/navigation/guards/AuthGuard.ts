import { CanActivateFn, Router } from "@angular/router";
import { AuthTokenRepository } from "../../../auth/repository/auth-token.repository";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = () => {
  const authRepository = inject(AuthTokenRepository);
  const router = inject(Router);

  if (authRepository.isLoggedIn()) {
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
