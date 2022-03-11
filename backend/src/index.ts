import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  AuthenticationError,
  gql,
} from "apollo-server-core";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";

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
    policyId: "cf464762-e43b-4fee-ab4c-7880e1af0679",
    provider: "Allianz",
    policyNumber: "e43b-4fee-ab4c",
    startDate: new Date(2022, 1, 1).toISOString(),
    endDate: new Date(2023, 1, 1).toISOString(),
    createdAt: new Date(2021, 12, 31).toISOString(),
    customer: {
      customerId: "41572f0e-6733-4b05-9878-986430d6bd97",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date(1960, 1, 1),
    },
    ensuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    policyId: "bfd375b0-7f99-47e5-a535-ab22e18827a0",
    provider: "Allianz",
    policyNumber: "7f99-47e5-a535",
    startDate: new Date(2022, 1, 1).toISOString(),
    endDate: new Date(2023, 1, 1).toISOString(),
    createdAt: new Date(2021, 12, 31).toISOString(),
    customer: {
      customerId: "10f31763-a5a0-41ab-8f1c-0e28c46e20a2",
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: new Date(1965, 1, 1),
    },
    ensuranceType: "HEALTH",
    status: "CANCELLED",
  },
  {
    policyId: "e5435114-054a-47d3-88a4-66c2d37a3b98",
    provider: "Allianz",
    policyNumber: "054a-47d3-88a4",
    startDate: new Date(2022, 1, 1).toISOString(),
    endDate: new Date(2023, 1, 1).toISOString(),
    createdAt: new Date(2021, 12, 31).toISOString(),
    customer: {
      customerId: "10f31763-a5a0-41ab-8f1c-0e28c46e20a2",
      firstName: "Jane",
      lastName: "Doe",
      dateOfBirth: new Date(1965, 1, 1),
    },
    ensuranceType: "HEALTH",
    status: "ACTIVE",
  },
];

const resolvers = {
  Query: {
    policies: () => policies,
  },
};

async function main() {
  const cookieKey = "feather-cookie";
  const cookieSecret = process.env.COOKIE_SECRET || "feather-cookie-secret";

  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();

  app.use(express.json());
  app.use(cookieParser(cookieSecret));
  app.post("/api/login", (req, res) => {
    if (req.body.login === "yoba" && req.body.password === "zayoba") {
      return res
        .cookie(cookieKey, "user", {
          signed: true,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .json({ message: "OK" });
    } else {
      return res
        .status(403)
        .json({ message: "Login or password is incorrect" });
    }
  });

  app.use((req, res, next) => {
    if (!req.signedCookies[cookieKey]) {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    return next();
  });

  app.get("/api/check-auth", (_, res) => res.status(200).json());
  app.use(apolloServer.getMiddleware());

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server is ready at http://localhost:4000`);
}

main().catch(console.error);
