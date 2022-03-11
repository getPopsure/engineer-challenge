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
    policies: [Policy]
  }
`;
