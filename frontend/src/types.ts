export type InsuranceType = 'LIABILITY' | 'HOUSEHOLD' | 'HEALTH';

export type Status = 'ACTIVE' | 'PENDING' | 'CANCELLED' | 'DROPPED_OUT';

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