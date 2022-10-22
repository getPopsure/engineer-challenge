import { Prisma, PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json())
app.use(cors())
app.get('/policies', async (req, res) => {
  const { search } = req.query;

  const or: Prisma.PolicyWhereInput = search
    ? {
      OR: [
        { provider: { contains: search as string, mode: 'insensitive' } },
        { customer: { firstName: { contains: search as string, mode: 'insensitive' } } },
        { customer: { lastName: { contains: search as string, mode: 'insensitive' } } }
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
