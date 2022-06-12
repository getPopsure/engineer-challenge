import express, { Response } from 'express';
import {
  PrismaClient,
  Prisma,
  InsuranceType,
  PolicyStatus,
} from '@prisma/client';

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json());

app.get(
  '/policies',
  async (
    req: {
      query: { search: string; status: PolicyStatus; insurance: InsuranceType };
    },
    res: Response
  ) => {
    const { search, status, insurance } = req.query;

    const searchQuery: Prisma.PolicyWhereInput = search
      ? {
          OR: [
            { provider: { contains: search as string, mode: 'insensitive' } },
            {
              customer: {
                firstName: {
                  contains: search as string,
                  mode: 'insensitive',
                },
              },
            },
            {
              customer: {
                lastName: { contains: search as string, mode: 'insensitive' },
              },
            },
            {
              relatives: {
                some: {
                  lastName: { contains: search as string, mode: 'insensitive' },
                },
              },
            },
            {
              relatives: {
                some: {
                  firstName: {
                    contains: search as string,
                    mode: 'insensitive',
                  },
                },
              },
            },
          ],
        }
      : {};

    const statusQuery: Prisma.PolicyWhereInput = status
      ? {
          status: {
            equals: status,
          },
        }
      : {};

    const insuranceTypeQuery: Prisma.PolicyWhereInput = insurance
      ? {
          insuranceType: {
            equals: insurance,
          },
        }
      : {};

    const policies = await prisma.policy.findMany({
      where: {
        ...searchQuery,
        ...insuranceTypeQuery,
        ...statusQuery,
        NOT: [
          {
            status: {
              equals: 'DROPPED_OUT',
            },
          },
          {
            status: {
              equals: 'CANCELLED',
            },
          },
        ],
      },
      select: {
        id: true,
        provider: true,
        insuranceType: true,
        status: true,
        startDate: true,
        endDate: true,
        relatives: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
          },
        },
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
  }
);

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀');
});

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
