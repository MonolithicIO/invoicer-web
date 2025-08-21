import { CanActivateFn, Router } from "@angular/router";
import { AuthTokenRepository } from "../../../domain/login/repository/auth-token.repository";
import { inject } from "@angular/core";

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
