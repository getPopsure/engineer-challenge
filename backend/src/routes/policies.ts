import { Router } from "express";

import {
  InsuranceType,
  PolicyStatus,
  Prisma,
  PrismaClient,
} from "@prisma/client";

const policiesRoute = Router();
const prisma = new PrismaClient();

policiesRoute.get("/policies", async (req, res) => {
  const { searchText, policyStatuses, insuranceTypes } = req.query;

  const whereOr: Array<Prisma.PolicyWhereInput> = [];
  const whereAnd: Array<Prisma.PolicyWhereInput> = [];

  // Filter by searchText if queryParam present. Single value
  if (searchText) {
    whereOr.push(
      {
        provider: { contains: searchText as string, mode: "insensitive" },
      },
      {
        customer: {
          firstName: {
            contains: searchText as string,
            mode: "insensitive",
          },
        },
      },
      {
        customer: {
          lastName: {
            contains: searchText as string,
            mode: "insensitive",
          },
        },
      }
    );
  }
  // Filter by insuranceTypes if queryParam present. Can be a single value or an array
  if (insuranceTypes) {
    if (Array.isArray(insuranceTypes)) {
      const whereNestedOr: Array<Prisma.PolicyWhereInput> = [];
      insuranceTypes.forEach((singlePolicyState) => {
        whereNestedOr.push({
          insuranceType:
            InsuranceType[singlePolicyState as keyof typeof InsuranceType],
        });
      });
      whereAnd.push({ OR: whereNestedOr });
    } else {
      whereAnd.push({
        insuranceType:
          InsuranceType[insuranceTypes as keyof typeof InsuranceType],
      });
    }
  }
  // Filter by policyStatuses if queryParam present. Can be a single value or an array
  if (policyStatuses) {
    if (Array.isArray(policyStatuses)) {
      const whereNestedOr: Array<Prisma.PolicyWhereInput> = [];
      policyStatuses.forEach((singlePolicyState) => {
        whereNestedOr.push({
          status: PolicyStatus[singlePolicyState as keyof typeof PolicyStatus],
        });
      });
      whereAnd.push({ OR: whereNestedOr });
    } else {
      whereAnd.push({
        status: PolicyStatus[policyStatuses as keyof typeof PolicyStatus],
      });
    }
  }
  const policies = await prisma.policy.findMany({
    where: {
      ...(searchText ? { OR: whereOr } : {}),
      ...(insuranceTypes || policyStatuses ? { AND: whereAnd } : {}),
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

export default policiesRoute;
