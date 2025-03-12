export interface Alumni {
  batch: number;
  studentName: string;
  countryOfResidence: string;
  currentRole: string;
  roleFunction: string;
  organization: string;
  linkedinUrl: string;
}

export interface SearchFilters {
  name?: string;
  batch?: number;
  country?: string;
  organization?: string;
}

export interface ReportData {
  alumni: Alumni;
  remark: string;
}

export interface SearchStats {
  totalSearches: number;
}