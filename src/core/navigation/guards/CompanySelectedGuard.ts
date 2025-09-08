import { CanActivateFn, Router } from "@angular/router";

import { inject } from "@angular/core";
import { CompanyRepository } from "../../../app/feature/company/repository/company.repository";

export const CompanySelectedGuard: CanActivateFn = () => {
  const repository = inject(CompanyRepository);
  const router = inject(Router);
  const isCompanySelected = repository.getSelectedCompany() !== null;

  if (isCompanySelected) {
    return true;
  } else {
    router.navigate(["user/select-company"]);
    return false;
  }
};
