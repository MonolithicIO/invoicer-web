import { Component, inject, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
import {
  CompanyListItemDto,
  ListCompaniesService,
} from "../../service/list-companies.service";
import { SelectCompanyService } from "../../service/select-company.service";
import { tap } from "rxjs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SelectCompanyCardComponent } from "./views/select-company-card/select-company-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { ErrorStateComponent } from "../../../../../core/design/views/error-state/error-state.component";

@Component({
  selector: "app-select-company",
  templateUrl: "./select-company.component.html",
  styleUrls: ["./select-company.component.css"],
  imports: [
    MatProgressSpinnerModule,
    SelectCompanyCardComponent,
    MatCardModule,
    MatButton,
    ErrorStateComponent,
  ],
})
export class SelectCompanyComponent implements OnInit {
  SelectCompanyMode = SelectCompanyMode;

  companies = signal<CompanyListItemDto[]>([]);
  uiMode = signal<SelectCompanyMode>(SelectCompanyMode.Loading);
  selectedCompanyId = signal<string | null>(null);

  private listCompanyService = inject(ListCompaniesService);
  private selectCompanyService = inject(SelectCompanyService);
  private router = inject(Router);

  ngOnInit(): void {
    this.fetchCompanies();
  }

  onSelectItem(item: CompanyListItemDto): void {
    this.selectedCompanyId.set(item.id);
  }

  unSelectItem(): void {
    this.selectedCompanyId.set(null);
  }

  onSubmit() {
    const company = this.companies().find(
      (c) => c.id === this.selectedCompanyId()
    );

    if (company) {
      this.selectCompanyService.selectCompany({
        name: company.name,
        id: company.id,
      });
      this.router.navigate(["/home"]);
    }
  }

  fetchCompanies() {
    this.listCompanyService
      .listCompanies({
        limit: 100,
        page: 0,
      })
      .pipe(
        tap({
          subscribe: () => {
            this.uiMode.set(SelectCompanyMode.Loading);
          },
        })
      )
      .subscribe({
        next: (companies) => {
          this.companies.set(companies.companies);
          this.uiMode.set(SelectCompanyMode.Content);
        },
        error: () => {
          this.uiMode.set(SelectCompanyMode.Error);
        },
      });
  }
}

export enum SelectCompanyMode {
  Loading,
  Content,
  Error,
}
