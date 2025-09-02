import { Component, signal } from "@angular/core";

@Component({
  selector: "app-app-header",
  imports: [],
  templateUrl: "./app-header.component.html",
  styleUrl: "./app-header.component.css",
})
export class AppHeaderComponent {
  readonly showHeader = signal(true);
  readonly isLoggedIn = signal(true);
  readonly companyName = signal("My Company");
  readonly dropdownOpen = signal(false);
}
