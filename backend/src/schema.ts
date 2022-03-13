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

  input PolicySorting {
    column: String = "createdAt"
    direction: SortingDirection = DESCENDING
  }

  type Query {
    getPolicies(sortBy: PolicySorting): [Policy!]!
    customers: [Customer!]!
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

export type Policy = {
  policyId: string;
  provider: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  customerId: string;
  insuranceType: "LIABILITY" | "HOUSEHOLD" | "HEALTH";
  status: "ACTIVE" | "PENDING" | "CANCELLED" | "DROPPED_OUT";
};

export type Customer = {
  customerId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type PolicySortingArgs = {
  sortBy: {
    column: keyof Policy | "name";
    direction: "ASCENDING" | "DESCENDING";
  };
};

export type State = {
  policies: Policy[];
  customers: Customer[];
};

export type GraphqlContext = {
  state: State;
  updateState(value: State): State;
};
