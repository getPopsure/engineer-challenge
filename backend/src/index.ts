import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import { apiRouter } from "./api";
import { State, typeDefs } from "./schema";
import {
  mutationUpdatePolicy,
  customerByIdResolver,
  getPoliciesQuery,
} from "./resolvers";

// check out my other test assignment where I actually work with PostgreSQL
// https://github.com/bakedchicken/n26-test-assignment
let state: State = {
  customers: [
    {
      customerId: "41572f0e-6733-4b05-9878-986430d6bd97",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1960-01-31",
    },
    {
      customerId: "10f31763-a5a0-41ab-8f1c-0e28c46e20a2",
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: "1965-01-31",
    },
    {
      customerId: "d8386c46-e227-49d4-a9fe-31ce2c79a5e0",
      firstName: "Greg",
      lastName: "Gregorovych",
      dateOfBirth: "2000-03-01",
    },
  ],
  policies: [
    {
      policyId: "cf464762-e43b-4fee-ab4c-7880e1af0679",
      provider: "Allianz",
      policyNumber: "e43b-4fee-ab4c",
      startDate: "2022-01-31",
      endDate: "2023-01-31",
      createdAt: "2022-01-30",
      customerId: "41572f0e-6733-4b05-9878-986430d6bd97",
      insuranceType: "HEALTH",
      status: "PENDING",
    },
    {
      policyId: "bfd375b0-7f99-47e5-a535-ab22e18827a0",
      provider: "Allianz",
      policyNumber: "7f99-47e5-a535",
      startDate: "2022-01-31",
      endDate: "2023-01-31",
      createdAt: "2022-01-30",
      customerId: "10f31763-a5a0-41ab-8f1c-0e28c46e20a2",
      insuranceType: "HEALTH",
      status: "CANCELLED",
    },
    {
      policyId: "e5435114-054a-47d3-88a4-66c2d37a3b98",
      provider: "Allianz",
      policyNumber: "054a-47d3-88a4",
      startDate: "2022-01-31",
      endDate: "2023-01-31",
      createdAt: "2022-01-30",
      customerId: "10f31763-a5a0-41ab-8f1c-0e28c46e20a2",
      insuranceType: "HEALTH",
      status: "ACTIVE",
    },
    {
      policyId: "ed2dd474-fdd4-439c-b7ac-fdce501e058f",
      provider: "Liability Insurances LLC",
      policyNumber: "fdd4-439c-b7ac",
      startDate: "2021-01-01",
      endDate: "2021-06-01",
      createdAt: "2020-12-02",
      customerId: "d8386c46-e227-49d4-a9fe-31ce2c79a5e0",
      insuranceType: "LIABILITY",
      status: "DROPPED_OUT",
    },
  ],
};

const resolvers = {
  Query: {
    getPolicies: getPoliciesQuery,
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
      updateState(value: State) {
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
