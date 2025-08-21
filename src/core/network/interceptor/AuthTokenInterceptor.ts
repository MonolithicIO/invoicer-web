import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthTokenRepository } from "../../../app/auth/repository/auth-token.repository";

export function AuthTokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const storage = inject(AuthTokenRepository);

  const accessToken = storage.getTokens()?.accessToken;

  if (accessToken) {
    const authorizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(authorizedReq);
  }

  return next(req);
}
