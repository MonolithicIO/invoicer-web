import { Component, inject, OnInit, signal } from "@angular/core";
import { CreateCompanyService } from "../../service/create-company.service";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
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
import { MatCheckbox } from "@angular/material/checkbox";

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
    MatCheckbox,
  ],
  templateUrl: "./create-company.component.html",
  styleUrl: "./create-company.component.css",
})
export class CreateCompanyComponent implements OnInit {
  private createService: CreateCompanyService = inject(CreateCompanyService);

  readonly useIntermediaryAccount = signal(false);
  readonly nameErrorText = signal<string | null>("");
  readonly documentErrorText = signal<string | null>("");
  readonly addressLine1ErrorText = signal<string | null>(null);
  readonly addressLine2ErrorText = signal<string | null>(null);
  readonly cityErrorText = signal<string | null>(null);
  readonly stateErrorText = signal<string | null>(null);
  readonly postalCodeErrorText = signal<string | null>(null);
  readonly primaryIbanErrorText = signal<string | null>(null);
  readonly primarySwiftErrorText = signal<string | null>(null);
  readonly primaryBankNameErrorText = signal<string | null>(null);
  readonly primaryBankAddressErrorText = signal<string | null>(null);
  readonly intermediaryIbanErrorText = signal<string | null>(null);
  readonly intermediarySwiftErrorText = signal<string | null>(null);
  readonly intermediaryBankNameErrorText = signal<string | null>(null);
  readonly intermediaryBankAddressErrorText = signal<string | null>(null);

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
    intermediaryIban: new FormControl(
      "",
      requiredIfSignalTrue(this.useIntermediaryAccount)
    ),
    intermediarySwift: new FormControl(
      "",
      requiredIfSignalTrue(this.useIntermediaryAccount)
    ),
    intermediaryBankName: new FormControl(
      "",
      requiredIfSignalTrue(this.useIntermediaryAccount)
    ),
    intermediaryBankAddress: new FormControl(
      "",
      requiredIfSignalTrue(this.useIntermediaryAccount)
    ),
  });

  ngOnInit(): void {
    this.identityWatcherGroup.startWatchFormChanges();
    this.addressWatcherGroup.startWatchFormChanges();
    this.primaryAccountWatcher.startWatchFormChanges();
    this.intermediaryAccountWatcher.startWatchFormChanges();
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
      this.addressLine1ErrorText
    ),
    addressLine2: new RequiredFieldFormField(
      "Address Line 2",
      this.getFormControllerByName("addressLine2"),
      this.addressLine2ErrorText
    ),
    city: new RequiredFieldFormField(
      "City",
      this.getFormControllerByName("city"),
      this.cityErrorText
    ),
    state: new RequiredFieldFormField(
      "State",
      this.getFormControllerByName("state"),
      this.stateErrorText
    ),
    postalCode: new RequiredFieldFormField(
      "Postal Code",
      this.getFormControllerByName("postalCode"),
      this.postalCodeErrorText
    ),
  });

  private primaryAccountWatcher = new FormControlErrorWatcherGroup({
    primaryIban: new RequiredFieldFormField(
      "IBAN",
      this.getFormControllerByName("primaryIban"),
      this.primaryIbanErrorText
    ),
    primarySwift: new RequiredFieldFormField(
      "SWIFT",
      this.getFormControllerByName("primarySwift"),
      this.primarySwiftErrorText
    ),
    primaryBankName: new RequiredFieldFormField(
      "Bank Name",
      this.getFormControllerByName("primaryBankName"),
      this.primaryBankNameErrorText
    ),
    primaryBankAddress: new RequiredFieldFormField(
      "Bank Address",
      this.getFormControllerByName("primaryBankAddress"),
      this.primaryBankAddressErrorText
    ),
  });

  private intermediaryAccountWatcher = new FormControlErrorWatcherGroup({
    intermediaryIban: new RequiredFieldFormField(
      "IBAN",
      this.getFormControllerByName("intermediaryIban"),
      this.intermediaryIbanErrorText
    ),
    intermediarySwift: new RequiredFieldFormField(
      "SWIFT",
      this.getFormControllerByName("intermediarySwift"),
      this.intermediarySwiftErrorText
    ),
    intermediaryBankName: new RequiredFieldFormField(
      "Bank Name",
      this.getFormControllerByName("intermediaryBankName"),
      this.intermediaryBankNameErrorText
    ),
    intermediaryBankAddress: new RequiredFieldFormField(
      "Bank Address",
      this.getFormControllerByName("intermediaryBankAddress"),
      this.intermediaryBankAddressErrorText
    ),
  });

  private getFormControllerByName(name: string): FormControl {
    return this.createCompanyForm.get(name) as FormControl;
  }

  onSubmit() {
    alert("Not implemented yet");
  }

  onToggleIntermediaryUsage() {
    const newValue = !this.useIntermediaryAccount();
    this.useIntermediaryAccount.set(newValue);
    if (!newValue) {
      this.getFormControllerByName("intermediaryIban").reset();
      this.getFormControllerByName("intermediarySwift").reset();
      this.getFormControllerByName("intermediaryBankName").reset();
      this.getFormControllerByName("intermediaryBankAddress").reset();
    }
  }
}

function requiredIfSignalTrue(signalFn: () => boolean): ValidatorFn {
  return (control: AbstractControl) => {
    if (signalFn() && !control.value) {
      return { required: true };
    }
    return null;
  };
}
