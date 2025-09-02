import { inject, Injectable } from "@angular/core";
import { SessionRepository } from "../repository/session.repository";

@Injectable({ providedIn: "root" })
export class SessionRefresherService {
  private readonly sessionRepository = inject(SessionRepository);

  refreshSession(): void {
    this.sessionRepository.refreshSession();
  }
}
