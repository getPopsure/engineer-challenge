import { InsuranceType, Policy, PolicyStatus } from '@prisma/client';

export class PolicyEntity implements Policy {
  id: string;
  customerId: string;
  provider: string;
  insuranceType: InsuranceType;
  status: PolicyStatus;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
