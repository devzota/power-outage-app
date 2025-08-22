export interface Organization {
  id: string;
  organizationName: string;
  closestManagementUnitId: string;
  closestSubManagementUnit1Id: string;
  code: string;
}

export interface Outage {
  subOrganizationCode: string;
  subOrganizationName: string;
  fromDate: string;
  fromDateStr: string;
  toDate: string;
  toDateStr: string;
  outageType: string;
  reason: string;
  stationCode: string;
  stationName: string;
  status: string;
  statusStr: string;
}

export interface OutageResponse {
  totalCount: number;
  items: Outage[];
}

export interface OutageFilters {
  orgCode?: string;
  subOrgCode: string;
  fromDate: string;
  toDate: string;
  page?: number;
  limit?: number;
}

export interface APIError {
  error: string;
}