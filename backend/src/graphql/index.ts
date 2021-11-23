import { ApolloServer, gql } from "apollo-server";
import { env } from "../config/environment";
import schema from "./schema";
import { join } from "path";

import { readdirSync, readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// const server = new ApolloServer({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema
});

export default apolloServer;
