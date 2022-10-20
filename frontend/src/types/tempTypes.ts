export class PaginatedResponse<T> {
  data: T[];
  pagination: {
    skip: number;
    take: number;
    total: number;
  };
}

export type PolicyFilters = {
  insuranceType: string[];
  insuranceStatus: string[];
};

export type PolicySearch = {
  customerName?: string;
  customerRelatives?: string;
  provider?: string;
};

export type PaginatedRequest<F, S> = {
  pagination: {
    skip: number;
    take: number;
  };
  filters: F;
  search: S;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};
