export type TPolicy = {
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }
  id: string;
  insuranceType: string;
  provider: string;
  startDate: string;
  endDate?: string
  status: string;
}