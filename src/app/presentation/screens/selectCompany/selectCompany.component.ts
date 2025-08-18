import { Component, inject, OnInit, signal } from "@angular/core";
import { ListCompaniesService } from "../../../domain/company/service/ListCompaniesService";
import { CompanyListItem } from "../../../data/company/model/ListCompaniesRequest";
import { ApiError } from "../../../../core/network/model/ApiError";
import { SelectCompanyService } from "../../../domain/company/service/SelectCompanyService";
import { Router } from "@angular/router";

@Component({
  selector: "app-select-company",
  templateUrl: "./selectCompany.component.html",
  styleUrls: ["./selectCompany.component.css"],
})
export class SelectCompanyComponent implements OnInit {
  companies = signal<CompanyListItem[]>([]);

  private listCompanyService = inject(ListCompaniesService);
  private selectCompanyService = inject(SelectCompanyService);
  private router = inject(Router);

  ngOnInit(): void {
    this.listCompanyService
      .listCompanies({
        limit: 100,
        page: 0,
      })
      .subscribe({
        next: (companies) => {
          this.companies.set(companies.companies);
        },
        error: (err: ApiError) => {
          alert(`Failed to load companies ${err.message}`);
        },
      });
  }

  onSelectItem(item: CompanyListItem): void {
    this.selectCompanyService.selectCompany({
      name: item.name,
      id: item.id,
    });
    this.router.navigate(["/home"]);
  }
}
