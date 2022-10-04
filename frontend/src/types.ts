export enum InsuranceType {
  LIABILITY = "Liability",
  HOUSEHOLD = "Household",
  HEALTH = "Health"
};
export enum Status {
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
  // endDate: Date;
  // createdAt: Date;
}

export type FilterKeys = keyof Pick<Policy, "provider" | "insuranceType" | "status">