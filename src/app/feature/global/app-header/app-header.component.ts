import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { SessionListenerService } from "../../session/service/session-listener.service";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-app-header",
  imports: [MatIconModule, MatButtonModule],
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
  readonly companyName = signal("");
  readonly dropdownOpen = signal(false);

  readonly showHeader = computed(() => {
    const shoulShow = this.currentRoute().startsWith("/user");
    return shoulShow;
  });

  readonly showChangeCompanyButton = computed(() => {
    const shouldShow = !this.currentRoute().startsWith("/user/select-company");
    return shouldShow;
  });

  onChangeCompanyClick() {
    this.route.navigate(["/user/select-company"]);
  }
}
