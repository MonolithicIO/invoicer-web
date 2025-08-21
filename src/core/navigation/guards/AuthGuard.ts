import { CanActivateFn, Router } from "@angular/router";

import { inject } from "@angular/core";
import { AuthTokenRepository } from "../../../app/feature/auth/repository/auth-token.repository";

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
