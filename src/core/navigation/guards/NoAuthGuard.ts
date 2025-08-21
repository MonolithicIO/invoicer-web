import { CanActivateFn, Router } from "@angular/router";

import { inject } from "@angular/core";
import { AuthTokenRepository } from "../../../app/feature/auth/repository/auth-token.repository";

export const NoAuthGuard: CanActivateFn = () => {
  const authRepository = inject(AuthTokenRepository);
  const router = inject(Router);

  if (authRepository.isLoggedIn()) {
    router.navigate(["/"]);
    return false;
  } else {
    return true;
  }
};
