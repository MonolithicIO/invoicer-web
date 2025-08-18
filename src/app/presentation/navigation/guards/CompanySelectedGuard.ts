import { CanActivateFn, Router } from "@angular/router";
import { CompanyRepository } from "../../../domain/company/repository/CompanyRepository";
import { inject } from "@angular/core";

export const CompanySelectedGuard: CanActivateFn = () => {
  const repository = inject(CompanyRepository);
  const router = inject(Router);
  const isCompanySelected = repository.getSelectedCompany() !== null;

  if (isCompanySelected) {
    return true;
  } else {
    router.navigate(["/select-company"]);
    return false;
  }
};
