import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Policy {
    policyId: ID!
    provider: String!
    policyNumber: String!
    startDate: String!
    endDate: String!
    createdAt: String!

    customer: Customer!
    insuranceType: InsuranceType!
    status: PolicyStatus!
  }

  type Customer {
    customerId: ID!
    firstName: String!
    lastName: String!
    dateOfBirth: String!
  }

  enum InsuranceType {
    LIABILITY
    HOUSEHOLD
    HEALTH
  }

  enum PolicyStatus {
    ACTIVE
    PENDING
    CANCELLED
    DROPPED_OUT
  }

  enum SortingDirection {
    ASCENDING
    DESCENDING
  }

  input PoliciesSorting {
    column: String!
    direction: SortingDirection!
  }

  input Pagination {
    page: Int!
    perPage: Int!
  }

  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    totalPages: Int!
    currentPage: Int!
  }

  type PoliciesPaginatedResult {
    policies: [Policy]!
    pageInfo: PageInfo
  }

  input PoliciesFilter {
    textFilter: String!
    insuranceTypeFilter: [InsuranceType]!
  }

  type Query {
    paginatedPolicies(
      sortBy: PoliciesSorting
      pagination: Pagination
      filter: PoliciesFilter
    ): PoliciesPaginatedResult
    policy(id: String!): Policy!
    customer(id: String!): Customer!
  }

  type Mutation {
    updatePolicy(
      policyId: ID!
      provider: String
      startDate: String
      endDate: String
    ): Policy!
  }
`;

export type InsuranceType = "LIABILITY" | "HOUSEHOLD" | "HEALTH";
export type PolicyStatus = "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT";

export type Policy = {
  policyId: string;
  provider: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  customerId: string;
  insuranceType: InsuranceType;
  status: PolicyStatus;
};

export type PolicyArgs = {
  id: string;
};

export type Customer = {
  customerId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type CustomerArgs = {
  id: string;
};

export type PoliciesArgs = {
  sortBy?: {
    column: keyof Policy | "name";
    direction: "ASCENDING" | "DESCENDING";
  };
  pagination?: {
    page: number;
    perPage: number;
  };
  filter?: {
    textFilter: string;
    insuranceTypeFilter: InsuranceType[];
  };
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  currentPage: number;
};

export type PolicyWithCustomer = Policy & {
  customer: Customer;
  name: string;
};

export type PoliciesPaginatedResult = {
  policies: Policy[] | PolicyWithCustomer[];
  pageInfo?: PageInfo;
};

export type State = {
  policies: Policy[];
  customers: Customer[];
};

export type GraphqlContext = {
  state: State;
  updateState(value: State): State;
};
