import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: "app-select-company-card",
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatCheckboxModule],
  templateUrl: "./select-company-card.component.html",
  styleUrl: "./select-company-card.component.css",
})
export class SelectCompanyCardComponent {
  @Input() companyName = "";
  @Input() document = "";
  @Input() isSelected = false;
  @Input() onSelect: () => void = () => {
    void 0;
  };
}
