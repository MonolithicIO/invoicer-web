import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  switchMap,
  take,
  throwError,
} from "rxjs";
import { Router } from "@angular/router";
import { AuthTokenRepository } from "../../../app/auth/repository/auth-token.repository";
import {
  LoginResult,
  RefreshTokenService,
} from "../../../app/auth/service/refresh-token.service";

export function UnAuthorizedInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const tokenRepository = inject(AuthTokenRepository);
  const refreshTokenService = inject(RefreshTokenService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        return handle401Error(
          req,
          next,
          refreshTokenService,
          tokenRepository,
          router
        );
      }

      return throwError(() => error);
    })
  );
}

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
  string | null
>(null);

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  refreshService: RefreshTokenService,
  tokenRepository: AuthTokenRepository,
  router: Router
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);
    const refreshToken = tokenRepository.getTokens()?.refreshToken ?? "";

    return refreshService.refreshToken(refreshToken).pipe(
      switchMap((response: LoginResult) => {
        refreshTokenSubject.next(response.token);
        const newRequest = addTokenToRequest(request, response.token);

        return next(newRequest);
      }),
      catchError((err) => {
        refreshTokenSubject.next(null);
        tokenRepository.clearTokens();
        router.navigate(["/"]);
        return throwError(() => err);
      }),
      finalize(() => {
        isRefreshing = false;
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        const newRequest = addTokenToRequest(request, token);
        return next(newRequest);
      })
    );
  }
}

function addTokenToRequest(
  request: HttpRequest<unknown>,
  token: string
): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
