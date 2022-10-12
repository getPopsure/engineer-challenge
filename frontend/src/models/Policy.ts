import { Customer } from "./Customer";

export type InsuranceType = "LIABILITY" | "HOUSEHOLD" | "HEALTH" | "NONE";

export type PolicyStatus = "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT" | "NONE";

export type Policy  = {
  id: number;
  customer: Customer;
  provider: string;
  insuranceType: InsuranceType;
  status: PolicyStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}