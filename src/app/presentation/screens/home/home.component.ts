import { Component, inject } from "@angular/core";
import { LogoutService } from "../../../domain/login/service/LogoutService";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  private logoutService = inject(LogoutService);
  private router = inject(Router);

  logout() {
    this.logoutService.logout().subscribe({
      next: () => {
        this.router.navigate(["/login"]);
      },
    });
  }
}
