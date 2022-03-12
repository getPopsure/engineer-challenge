import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import { apiRouter } from "./api";
import { typeDefs } from "./schema";
import {
  mutationUpdatePolicy,
  customerByIdResolver,
  policiesQuery,
} from "./resolvers";

const resolvers = {
  Query: {
    policies: policiesQuery,
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
