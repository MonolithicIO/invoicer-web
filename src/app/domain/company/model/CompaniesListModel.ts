export interface CompaniesListModel {
  companies: CompanyListItemModel[];
  total: number;
  nextPageIndex: number | null;
}

export interface CompanyListItemModel {
  document: string;
  name: string;
  id: string;
}
