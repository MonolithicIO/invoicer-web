import { inject, Injectable } from "@angular/core";
import { SessionRepository } from "../repository/session.repository";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SessionListenerService {
  private readonly repository = inject(SessionRepository);

  listenSelectedCompany(): Observable<SessionCompanyDto | null> {
    return this.repository.getCurrentCompany();
  }
}

export interface SessionCompanyDto {
  id: string;
  name: string;
}
