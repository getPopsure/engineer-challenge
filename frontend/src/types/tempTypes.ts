export class PaginatedResponse<T> {
  data: T[];
  pagination: {
    skip: number;
    take: number;
    total: number;
  };
}

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};
