import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { Server } from "http";

import data from "./data.json";
import { GraphqlContext, State, typeDefs } from "./schema";
import {
  getPoliciesQuery,
  mutationUpdatePolicy,
  customerByIdResolver,
  policyByIdResolver,
} from "./resolvers";

// check out my other test assignment where I actually work with PostgreSQL
// https://github.com/bakedchicken/n26-test-assignment
let state: State = data as State;

const resolvers = {
  Query: {
    paginatedPolicies: getPoliciesQuery,
    policy: policyByIdResolver,
    customer: customerByIdResolver,
  },
  Mutation: {
    updatePolicy: mutationUpdatePolicy,
  },
  Policy: {
    customer: customerByIdResolver,
  },
};

const context = {
  get state() {
    return state;
  },
  updateState: (value: State): State => {
    // will be persistent until server restarts
    // I think this is good enough to demonstrate that mutation is working
    state = value;
    return state;
  },
};

export function createApolloServer(withContext: GraphqlContext = context) {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: withContext,
  });
}
