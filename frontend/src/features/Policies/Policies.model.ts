type InsuranceType = 'HEALTH' | 'LIABILITY' | 'HOUSEHOLD';

export type PolicyStatus = 'ACTIVE' | 'PENDING' | 'CANCELLED' | 'DROPPED_OUT';

export type Provider = 'BARMER' | 'PENDING' | 'CANCELLED' | 'DROPPED_OUT';

interface Customer {
  dateOfBirth: Date;
  firstName: string;
  id: string;
  lastName: string;
}

export interface Policy {
  customer: Customer;
  endDate: Date | null;
  id: string;
  insuranceType: InsuranceType;
  provider: 'BARMER';
  startDate: Date;
  status: PolicyStatus;
}
