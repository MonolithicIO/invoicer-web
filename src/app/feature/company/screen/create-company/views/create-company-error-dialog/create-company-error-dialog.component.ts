import { Component, inject } from "@angular/core";
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogClose,
  MatDialogActions,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";

@Component({
  selector: "app-create-company-error-dialog",
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: "./create-company-error-dialog.component.html",
  styleUrl: "./create-company-error-dialog.component.css",
})
export class CreateCompanyErrorDialogComponent {
  dialogData = inject(MAT_DIALOG_DATA);
}
