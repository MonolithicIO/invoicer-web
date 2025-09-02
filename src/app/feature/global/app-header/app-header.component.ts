import { Component, inject, OnInit, signal } from "@angular/core";
import { SessionListenerService } from "../../session/service/session-listener.service";

@Component({
  selector: "app-app-header",
  imports: [],
  templateUrl: "./app-header.component.html",
  styleUrl: "./app-header.component.css",
})
export class AppHeaderComponent implements OnInit {
  private readonly sessionService = inject(SessionListenerService);

  ngOnInit(): void {
    this.sessionService.listenSelectedCompany().subscribe((company) => {
      this.isLoggedIn.set(company != null);
      if (company) {
        this.companyName.set(company.name);
      }
    });
  }

  readonly showHeader = signal(true);
  readonly isLoggedIn = signal(false);
  readonly companyName = signal("");
  readonly dropdownOpen = signal(false);
}
