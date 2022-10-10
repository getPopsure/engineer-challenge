export type InsuranceType = 'LIABILITY' | 'HOUSEHOLD' | 'HEALTH';
export type PolicyStatus = 'ACTIVE' | 'PENDING' | 'CANCELLED' | 'DROPPED_OUT'

export enum PolicyStatusEnum {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  Cancelled = 'CANCELLED',
  DroppedOut = 'DROPPED_OUT'
}

export enum InsuranceTypeEnums {
  Liability = 'LIABILITY',
  Household = 'HOUSEHOLD',
  Health=  'HEALTH'
};


export interface Customer {
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
}

export interface Policy {
  id: string,
  customer: Customer,
  provider: string,
  insuranceType: InsuranceType,
  status: PolicyStatus,
  startDate: Date,
  endDate: Date,
  createdAt: Date,
}


