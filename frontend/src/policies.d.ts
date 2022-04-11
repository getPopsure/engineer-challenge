type PolicyStatus = "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT";

type InsuranceType = "LIABILITY" | "HOUSEHOLD" | "HEALTH";

interface Customer {
  id: string; // TODO: install uuid
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

interface Policy {
  id: string;
  customer: Customer;
  provider: string;
  insuranceType: InsuranceType;
  status: PolicyStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
