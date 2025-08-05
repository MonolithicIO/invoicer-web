import {
  HttpHandlerFn,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { Observable } from "rxjs";
import { ApiError } from "../ApiError";

export function ErrorInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Converte o erro HTTP em nosso modelo de erro personalizado
      const apiError: ApiError = {
        message: error.error?.message || error.message || "Unknown error",
        statusCode: error.status,
        timeStamp: error.error?.timestamp || "",
      };

      return throwError(() => apiError);
    })
  );
}
