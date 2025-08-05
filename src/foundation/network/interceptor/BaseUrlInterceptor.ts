import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function BaseUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const apiRequest = req.clone({
    url: `http://localhost:8080${req.url}`,
  });

  return next(apiRequest);
}
