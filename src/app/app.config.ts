import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "../presentation/navigation/routes/app.routes";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { BaseUrlInterceptor } from "../foundation/network/interceptor/BaseUrlInterceptor";
import { ErrorInterceptor } from "../foundation/network/interceptor/ErrorInterceptor";
import { AuthTokenInterceptor } from "../foundation/network/interceptor/AuthTokenInterceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        BaseUrlInterceptor,
        ErrorInterceptor,
        AuthTokenInterceptor,
      ])
    ),
  ],
};
