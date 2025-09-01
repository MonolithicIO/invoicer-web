import { Component, inject, OnInit, signal } from "@angular/core";
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
import { MatCardModule } from "@angular/material/card";
import { RequiredFieldFormField } from "./form-fields/create-company-form-fields";
import { FormControlErrorWatcherGroup } from "../../../../../core/util/form-control-error-watcher";

@Component({
  selector: "app-create-company",
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: "./create-company.component.html",
  styleUrl: "./create-company.component.css",
})
export class CreateCompanyComponent implements OnInit {
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

  readonly nameErrorText = signal<string | null>("");
  readonly documentErrorText = signal<string | null>("");

  ngOnInit(): void {
    this.identityFormFields.startWatchFormChanges();
  }

  private identityFormFields = new FormControlErrorWatcherGroup({
    name: new RequiredFieldFormField(
      "Company name",
      this.getFormControllerByName("name"),
      this.nameErrorText
    ),
    document: new RequiredFieldFormField(
      "Document",
      this.getFormControllerByName("document"),
      this.documentErrorText
    ),
  });

  private getFormControllerByName(name: string): FormControl {
    return this.createCompanyForm.get(name) as FormControl;
  }
}
