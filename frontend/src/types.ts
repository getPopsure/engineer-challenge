export type InsuranceType = "LIABILITY" | "HOUSEHOLD" | "HEALTH";
export enum InsuranceTypeLabels {
  LIABILITY = "Liability",
  HOUSEHOLD = "Household",
  HEALTH = "Health"
};
export type Status = "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT"
export enum StatusLabels {
  ACTIVE = "Active",
  PENDING = "Pending",
  CANCELLED = "Cancelled",
  DROPPED_OUT = "Dropped out",
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
  createdAt: Date;
}

export type FilterKeys = "provider" | "insuranceType" | "status";
export type FilterValues = string[] | InsuranceType[] | Status[];

export type Filters = {
  provider?: string[],
  insuranceType?: InsuranceType[],
  status?: Status[]
}
