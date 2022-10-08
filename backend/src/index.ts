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

app.post('/policies', async (req, res) => {
  const { search } = req.query;
  const { filters: { provider, insuranceType, status }, pagination: { page, resultsPerPage } } = req.body;

  const and: Prisma.PolicyWhereInput = {
    AND: [
      provider ? { provider: { in: provider as string[], mode: 'insensitive' } } : {},
      insuranceType ? { insuranceType: { in: insuranceType } } : {},
      status ? { status: { in: status } } : {},
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

  const policiesCount = await prisma.policy.count();
  const policies = await prisma.policy.findMany({
    skip: page * resultsPerPage,
    take: resultsPerPage,
    where: {
      ...and,
      ...or,
    },
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
    policiesCount,
    policies
  });
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
