export type InsuranceType = "LIABILITY" | "HOUSEHOLD" | "HEALTH";
export enum InsuranceTypeLabels {
  LIABILITY = "Liability",
  HOUSEHOLD = "Household",
  HEALTH = "Health"
};
export type Status = "ACTIVE" | "PENDING";
export enum StatusLabels {
  ACTIVE = "Active",
  PENDING = "Pending",
};

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface Policy {
  id: string;
  customer: Customer;
  provider: string;
  insuranceType: InsuranceType;
  status: Status;
  startDate: Date;
  endDate: Date | null;
}

export type PolicyResponse = {
  id: string,
  provider: string,
  insuranceType: InsuranceType,
  status: Status,
  startDate: string,
  endDate: string | null,
  customer: {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string
  }
}

export type FilterKeys = "provider" | "insuranceType" | "status";
export type FilterValues = string[] | InsuranceType[] | Status[];

export type Filters = {
  provider?: string[],
  insuranceType?: InsuranceType[],
  status?: Status[]
}

export type PaginationPayload = {
  page: number,
  resultsPerPage: number
}