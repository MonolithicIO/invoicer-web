import { Component, inject } from "@angular/core";
import { CreateCompanyService } from "../../service/create-company.service";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCard } from "@angular/material/card";

@Component({
  selector: "app-create-company",
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCard,
  ],
  templateUrl: "./create-company.component.html",
  styleUrl: "./create-company.component.css",
})
export class CreateCompanyComponent {
  private createService: CreateCompanyService = inject(CreateCompanyService);

  readonly createCompanyForm = new FormGroup({
    name: new FormControl("", Validators.required),
    document: new FormControl("", Validators.required),
    addressLine1: new FormControl("", Validators.required),
    addressLine2: new FormControl(""),
    city: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    postalCode: new FormControl("", Validators.required),
    primaryIban: new FormControl("", Validators.required),
    primarySwift: new FormControl("", Validators.required),
    primaryBankName: new FormControl("", Validators.required),
    primaryBankAddress: new FormControl("", Validators.required),
    // intermediaryIban: new   FormControl("", Validators.required),
    // intermediarySwift: new FormControl("", Validators.required),
    // intermediaryBankName: new FormControl("", Validators.required),
    // intermediaryBankAddress: new FormControl("", Validators.required),
  });
}
