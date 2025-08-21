import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { BaseUrlInterceptor } from "../core/network/interceptor/BaseUrlInterceptor";
import { ErrorInterceptor } from "../core/network/interceptor/ErrorInterceptor";
import { AuthTokenInterceptor } from "../core/network/interceptor/AuthTokenInterceptor";
import { UnAuthorizedInterceptor } from "../core/network/interceptor/UnAuthorizedInterceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        BaseUrlInterceptor,
        AuthTokenInterceptor,
        ErrorInterceptor,
        UnAuthorizedInterceptor,
      ])
    ),
  ],
};
