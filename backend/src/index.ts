import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
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

const policies = [
  {
    policyId: 'cf464762-e43b-4fee-ab4c-7880e1af0679',
    provider: 'Allianz',
    policyNumber: 'e43b-4fee-ab4c',
    startDate: new Date(2022, 1, 1).toISOString(),
    endDate: new Date(2023, 1, 1).toISOString(),
    createdAt: new Date(2021, 12, 31).toISOString(),
    customer: {
      customerId: '41572f0e-6733-4b05-9878-986430d6bd97',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date(1960, 1, 1)
    },
    ensuranceType: 'HEALTH',
    status: 'PENDING'
  },
  {
    policyId: 'bfd375b0-7f99-47e5-a535-ab22e18827a0',
    provider: 'Allianz',
    policyNumber: '7f99-47e5-a535',
    startDate: new Date(2022, 1, 1).toISOString(),
    endDate: new Date(2023, 1, 1).toISOString(),
    createdAt: new Date(2021, 12, 31).toISOString(),
    customer: {
      customerId: '10f31763-a5a0-41ab-8f1c-0e28c46e20a2',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: new Date(1965, 1, 1)
    },
    ensuranceType: 'HEALTH',
    status: 'CANCELLED'
  },
  {
    policyId: 'e5435114-054a-47d3-88a4-66c2d37a3b98',
    provider: 'Allianz',
    policyNumber: '054a-47d3-88a4',
    startDate: new Date(2022, 1, 1).toISOString(),
    endDate: new Date(2023, 1, 1).toISOString(),
    createdAt: new Date(2021, 12, 31).toISOString(),
    customer: {
      customerId: '10f31763-a5a0-41ab-8f1c-0e28c46e20a2',
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: new Date(1965, 1, 1)
    },
    ensuranceType: 'HEALTH',
    status: 'ACTIVE'
  },
]

const resolvers = {
  Query: {
    policies: () => policies,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
