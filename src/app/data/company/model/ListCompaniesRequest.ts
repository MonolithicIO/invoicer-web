export interface ListCompaniesRequest {
  page: number;
  pageSize: number;
}

export interface ListCompaniesResponse {
  companies: CompanyListItem[];
  total: number;
  nextPageIndex: number | null;
}

export interface CompanyListItem {
  document: string;
  name: string;
  id: string;
}
