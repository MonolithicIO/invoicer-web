import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-error-state",
  imports: [MatButtonModule],
  templateUrl: "./error-state.component.html",
  styleUrl: "./error-state.component.css",
})
export class ErrorStateComponent {
  @Input() errorTitle: string | null = "Something went wrong";
  @Input() errorMessage: string | null = "Please try again later.";
  @Input() onRetry: () => void = () => {
    void 0;
  };
}
