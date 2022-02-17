import { ApolloServer, gql } from "apollo-server";
import dateScalar from "./dateScalar";
import { policies } from "./mockData";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
  scalar Date

  type Policy {
    customer: Customer
    provider: String
    insuranceType: InsuranceType
    status: PolicyStatus
    policyNumber: String
    startDate: Date
    endDate: Date
    createdAt: Date
  }

  type Customer {
    firstName: String
    lastName: String
    dateOfBirth: Date
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
    DROPPED
  }

  type Query {
    policiesCount: Int!
    allPolicies: [Policy]!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Date: dateScalar,
  Query: {
    policiesCount: () => policies.length,
    allPolicies: () => policies,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
