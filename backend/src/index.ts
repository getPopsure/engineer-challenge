import express from 'express';
import { PrismaClient, Prisma, PolicyStatus } from '@prisma/client';
import cors from "cors";
const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(express.json())

app.get('/policies', async (req, res) => {
  const { search, paginationOptionsTake, paginationOptionsSkip } = req.query;  
  const status = search?.toString().split(',') as Prisma.Enumerable<PolicyStatus>;

  const or: Prisma.PolicyWhereInput = search
    ? {
      OR: [
        { status: { in: status as Prisma.Enumerable<PolicyStatus> }} ,
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
