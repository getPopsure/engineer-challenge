import {
    PrismaClient,
    Prisma,
  } from "@prisma/client";
  
  const prisma = new PrismaClient();
  
  const findPolicies = async (filter: any) => {
    const or: Prisma.PolicyWhereInput = filter
      ? {
          OR: [
            { provider: { contains: filter as string, mode: "insensitive" } },
            {
              customer: {
                firstName: { contains: filter as string, mode: "insensitive" },
              },
            },
            {
              customer: {
                lastName: { contains: filter as string, mode: "insensitive" },
              },
            },
          ],
        }
      : {};
  
    const policies = await prisma.policy.findMany({
      where: {
        ...or,
        status: { in: ['ACTIVE', 'PENDING'] }
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
  
  export default { findPolicies };
  