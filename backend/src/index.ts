import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import state from "./state.json";
import { apiRouter } from "./api";
import { typeDefs } from "./schema";

const resolvers = {
  Query: {
    policies: state.policies,
  },
  Policy: {
    customer: (parent: typeof state.policies[0]) => {
      const customer = state.customers.find(
        (c) => c.customerId === parent.customerId
      );

      if (!customer) {
        throw new Error(
          `Invalid relation! Customer with id ${parent.customerId} does not exist!`
        );
      }

      return customer;
    },
  },
};

async function main() {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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
