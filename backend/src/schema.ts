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

  type Query {
    policies: [Policy!]!
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

export enum InsuranceTypes {
  LIABILITY = "LIABILITY",
  HOUSEHOLD = "HOUSEHOLD",
  HEALTH = "HEALTH",
}

export enum StatusTypes {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DROPPED_OUT = "DROPPED_OUT",
}

export type Policy = {
  policyId: string;
  provider: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  customerId: string;
  insuranceType: InsuranceTypes;
  status: StatusTypes;
};

export type Customer = {
  customerId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type State = {
  policies: Policy[];
  customers: Customer[];
};
