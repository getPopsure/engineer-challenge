import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/providers', async (req, res) => {
  let providers = await prisma.policy.findMany({
    distinct: ['provider'],
    select: {
      provider: true,
    }
  }) as { provider: string }[];

  // @ts-ignore
  let uniqueProviders = providers.reduce((acc, curr) => {
    acc.push(curr.provider)
    return acc;
  }, [] as Array<string>);

  res.json(uniqueProviders);
})

app.post('/policies', async (req, res) => {
  const {
    filters,
    pagination: { page, resultsPerPage },
    search
  } = req.body;

  const and: Prisma.PolicyWhereInput = {
    AND: [
      filters.provider ? { provider: { in: filters.provider as string[], mode: 'insensitive' } } : {},
      filters.insuranceType ? { insuranceType: { in: filters.insuranceType } } : {},
      filters.status ? { status: { in: filters.status } } : {},
    ]
  }

  const or: Prisma.PolicyWhereInput = search
    ? {
      OR: [
        { customer: { firstName: { contains: search as string, mode: 'insensitive' } } },
        { customer: { lastName: { contains: search as string, mode: 'insensitive' } } }
      ]
    }
    : {};

  const where = { ...and, ...or };

  const count = await prisma.policy.count({ where: { ...and, ...or } });
  const policies = await prisma.policy.findMany({
    skip: page * resultsPerPage,
    take: resultsPerPage,
    where,
    // order by newest first
    orderBy: {
      startDate: "desc",
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
          dateOfBirth: true
        }
      }
    }
  })

  res.json({
    count,
    policies,
  });
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
