import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { SessionListenerService } from "../../session/service/session-listener.service";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-app-header",
  imports: [],
  templateUrl: "./app-header.component.html",
  styleUrl: "./app-header.component.css",
})
export class AppHeaderComponent implements OnInit {
  private readonly sessionService = inject(SessionListenerService);
  private readonly route = inject(Router);

  ngOnInit(): void {
    this.sessionService.listenSelectedCompany().subscribe((company) => {
      if (company) {
        this.companyName.set(company.name);
      } else {
        this.companyName.set("");
      }
    });

    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });
  }

  private readonly currentRoute = signal("");

  readonly showHeader = computed(() => {
    const shoulShow = this.currentRoute().startsWith("/user");
    return shoulShow;
  });

  readonly companyName = signal("");
  readonly dropdownOpen = signal(false);
}
