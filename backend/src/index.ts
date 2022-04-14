import express from "express";
import {
  PrismaClient,
  Prisma,
  InsuranceType,
  PolicyStatus,
} from "@prisma/client";
import cors from "cors";

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const stringToEnumValue = <T>(
  enm: { [s: string]: T },
  value: string
): T[] | undefined => {
  const filtered = Object.keys(enm).filter((item) => {
    return item.includes(value.toUpperCase());
  });
  const mapped = filtered.map((item) => enm[item]); // convert to enum value type
  return mapped.length ? mapped : undefined;
};

app.get("/policies", async (req, res) => {
  const { search } = req.query;

  const or: Prisma.PolicyWhereInput = search
    ? {
        OR: [
          { provider: { contains: search as string, mode: "insensitive" } },
          {
            customer: {
              firstName: { contains: search as string, mode: "insensitive" },
            },
          },
          {
            customer: {
              lastName: { contains: search as string, mode: "insensitive" },
            },
          },
          {
            insuranceType: {
              in: stringToEnumValue(InsuranceType, search as string),
            },
          },
          {
            status: {
              in: stringToEnumValue(PolicyStatus, search as string),
            },
          },
        ],
      }
    : {};

  const policies = await prisma.policy.findMany({
    where: {
      ...or,
    },
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true,
        },
      },
    },
  });

  res.json(policies);
});

app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
