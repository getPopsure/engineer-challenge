import { ApolloServer, gql } from "apollo-server";
import { GraphQLScalarType } from 'graphql';

const typeDefs = gql`
  scalar Date

  enum InsuranceType {
    LIABILITY
    HOUSEHOLD
    HEALTH
  }

  enum PolicyStatus {
    ACTIVE
    PENDING
    CANCELLED
    DROPPEDOUT
  }

  type Policy {
    customer: Customer!
    provider: String!
    insuranceType: InsuranceType!
    status: PolicyStatus!
    policyNumber: String!
    startDate: Date
    endDate: Date
    createdAt: Date 
  }

  type Customer {
    firstName: String!
    lastName: String!
    dateOfBirth: Date!
  }

  type Query {
    policies: [Policy]
  }
`;

//Hard code customers and policies data
const customers = [
  {
    firstName: "Sam",
    lastName: "Smith",
    dateOfBirth: new Date("07,01,1995")
  },
  {
    firstName: "Julia",
    lastName: "James",
    dateOfBirth: new Date("12,24,1990")
  }
];

const policies = [
  {
    customer: customers[0]!,
    provider: "Allianz",
    insuranceType: "LIABILITY",
    status: "ACTIVE",
    policyNumber: "123456",
    startDate: new Date("07-01-2020"),
    endDate: new Date("07-01-2023"),
    createdAt: new Date("07-01-2020") 
  },
  {
    customer: customers[1]!,
    provider: "AXA",
    insuranceType: "HOUSEHOLD",
    status: "PENDING",
    policyNumber: "789101",
    createdAt: new Date("10,01,2020") 
  },
];

//Define custom Date scalar type for GraphQL
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
});

const resolvers = {
  Query: {
    policies: () => policies,
  },
  Date: dateScalar
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
