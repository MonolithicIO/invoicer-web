import { Component, inject, OnInit, signal } from "@angular/core";
import { ApiError } from "../../../../../core/network/model/ApiError";
import { Router } from "@angular/router";
import {
  CompanyListItemDto,
  ListCompaniesService,
} from "../../service/list-companies.service";
import { SelectCompanyService } from "../../service/select-company.service";

@Component({
  selector: "app-select-company",
  templateUrl: "./select-company.component.html",
  styleUrls: ["./select-company.component.css"],
})
export class SelectCompanyComponent implements OnInit {
  companies = signal<CompanyListItemDto[]>([]);

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

  onSelectItem(item: CompanyListItemDto): void {
    this.selectCompanyService.selectCompany({
      name: item.name,
      id: item.id,
    });
    this.router.navigate(["/home"]);
  }
}
