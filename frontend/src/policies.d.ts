type PolicyStatus = "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT";
type InsuranceType = "LIABILITY" | "HOUSEHOLD" | "HEALTH";

type Policy = {
  id: string;
  provider: string;
  insuranceType: InsuranceType;
  status: PolicyStatus;
  startDate: Date;
  endDate: Date;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
  };
};
