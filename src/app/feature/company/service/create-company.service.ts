import { inject, Injectable } from "@angular/core";
import { CompanyRepository } from "../repository/company.repository";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CreateCompanyService {
  private repository = inject(CompanyRepository);

  createCompany(request: CreateCompanyDto): Observable<void> {
    return this.repository.createCompany(request);
  }
}

export interface CreateCompanyDto {
  name: string;
  document: string;
  address: CreateCompanyAddressDto;
  primaryAccount: CreateCompanyPayAccountDto;
  intermediaryAccount: CreateCompanyPayAccountDto | null;
}

export interface CreateCompanyAddressDto {
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
}

export interface CreateCompanyPayAccountDto {
  iban: string;
  swift: string;
  bankName: string;
  bankAddress: string;
}
