import express from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import cors from "cors";

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json())
app.use(cors())

app.get('/policies', async (req, res) => {
  const { search } = req.query;
  const { providers, insuranceType, status } = req.body;

  const and: Prisma.PolicyWhereInput = {
    AND: [
      providers ? { provider: { in: providers as string[], mode: 'insensitive' } } : {},
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

  const policies = await prisma.policy.findMany({
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

  res.json(policies);
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
