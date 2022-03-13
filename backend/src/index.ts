import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import data from "./data.json";
import { apiRouter } from "./api";
import { State, typeDefs } from "./schema";
import {
  mutationUpdatePolicy,
  customerByIdResolver,
  getPoliciesQuery,
} from "./resolvers";

// check out my other test assignment where I actually work with PostgreSQL
// https://github.com/bakedchicken/n26-test-assignment
let state: State = data as State;

const resolvers = {
  Query: {
    paginatedPolicies: getPoliciesQuery,
  },
  Mutation: {
    updatePolicy: mutationUpdatePolicy,
  },
  Policy: {
    customer: customerByIdResolver,
  },
};

async function main() {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      get state() {
        return state;
      },
      updateState: (value: State): State => {
        // will be persistent until server restarts
        // I think this is good enough to demonstrate that mutation is working
        state = value;
        return state;
      },
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await apolloServer.start();
  app.use("/api", apiRouter);
  app.use("/api", apolloServer.getMiddleware());

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server is ready at http://localhost:4000`);
}

main().catch(console.error);
