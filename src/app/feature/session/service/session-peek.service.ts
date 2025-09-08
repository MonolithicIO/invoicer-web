import { inject, Injectable } from "@angular/core";
import { SessionRepository } from "../repository/session.repository";
import { firstValueFrom } from "rxjs";

@Injectable({ providedIn: "root" })
export class SessionPeekService {
  private readonly repository = inject(SessionRepository);

  async peek(): Promise<SessionDto> {
    const company = await firstValueFrom(this.repository.getCurrentCompany());

    return {
      companyId: company ? company.id : "",
      company: company ? company.name : "",
    };
  }
}

export interface SessionDto {
  companyId: string;
  company: string;
}
