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
import { MatDividerModule } from "@angular/material/divider";

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
    MatDividerModule,
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
  readonly name = signal<string | null>(null);
  readonly document = signal<string | null>(null);
  readonly addressLine1 = signal<string | null>(null);
  readonly addressLine2 = signal<string | null>(null);
  readonly city = signal<string | null>(null);
  readonly state = signal<string | null>(null);
  readonly postalCode = signal<string | null>(null);
  readonly primaryIban = signal<string | null>(null);
  readonly primarySwift = signal<string | null>(null);
  readonly primaryBankName = signal<string | null>(null);
  readonly primaryBankAddress = signal<string | null>(null);

  ngOnInit(): void {
    this.identityWatcherGroup.startWatchFormChanges();
    this.addressWatcherGroup.startWatchFormChanges();
    this.primaryAccountWatcher.startWatchFormChanges();
  }

  private identityWatcherGroup = new FormControlErrorWatcherGroup({
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

  private addressWatcherGroup = new FormControlErrorWatcherGroup({
    addressLine1: new RequiredFieldFormField(
      "Address Line 1",
      this.getFormControllerByName("addressLine1"),
      this.addressLine1
    ),
    addressLine2: new RequiredFieldFormField(
      "Address Line 2",
      this.getFormControllerByName("addressLine2"),
      this.addressLine2
    ),
    city: new RequiredFieldFormField(
      "City",
      this.getFormControllerByName("city"),
      this.city
    ),
    state: new RequiredFieldFormField(
      "State",
      this.getFormControllerByName("state"),
      this.state
    ),
    postalCode: new RequiredFieldFormField(
      "Postal Code",
      this.getFormControllerByName("postalCode"),
      this.postalCode
    ),
  });

  private primaryAccountWatcher = new FormControlErrorWatcherGroup({
    primaryIban: new RequiredFieldFormField(
      "IBAN",
      this.getFormControllerByName("primaryIban"),
      this.primaryIban
    ),
    primarySwift: new RequiredFieldFormField(
      "SWIFT",
      this.getFormControllerByName("primarySwift"),
      this.primarySwift
    ),
    primaryBankName: new RequiredFieldFormField(
      "Bank Name",
      this.getFormControllerByName("primaryBankName"),
      this.primaryBankName
    ),
    primaryBankAddress: new RequiredFieldFormField(
      "Bank Address",
      this.getFormControllerByName("primaryBankAddress"),
      this.primaryBankAddress
    ),
  });

  private getFormControllerByName(name: string): FormControl {
    return this.createCompanyForm.get(name) as FormControl;
  }

  onSubmit() {
    alert("Not implemented yet");
  }
}
