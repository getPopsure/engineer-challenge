import { InsuranceType, PolicyStatus } from '@prisma/client';

export class ResponsePolicyDto {
  id: string;
  provider: string;
  insuranceType: InsuranceType;
  status: PolicyStatus;
  startDate: Date;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
  };
  relatives: Array<{
    id: string;
    role: string;
    relative: {
      id: string;
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
    };
  }>;
}
