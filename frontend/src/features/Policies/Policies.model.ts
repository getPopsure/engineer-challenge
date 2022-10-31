type InsuranceType = 'HEALTH' | 'LIABILITY' | 'HOUSEHOLD';

export type PolicyStatus = 'ACTIVE' | 'PENDING' | 'CANCELLED' | 'DROPPED_OUT';

export type Provider = 'BARMER' | 'AOK' | 'DAK' | 'TK';

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
  provider: Provider;
  startDate: Date;
  status: PolicyStatus;
}
