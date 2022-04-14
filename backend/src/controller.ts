import {
  PrismaClient,
  Prisma,
  InsuranceType,
  PolicyStatus,
} from "@prisma/client";
import { getMatchingEnumValue } from "./utils";

const prisma = new PrismaClient();

const getPolicies = async ({ search }: any) => {
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
              in: getMatchingEnumValue(InsuranceType, search as string),
            },
          },
          {
            status: {
              in: getMatchingEnumValue(PolicyStatus, search as string),
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
  return policies;
};

export default { getPolicies };
