import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-home",
  imports: [MatCardModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  private router = inject(Router);

  onInvoiceClick() {
    alert("Not yet implemented");
  }

  onCustomerClick() {
    alert("Not yet implemented");
  }
}
