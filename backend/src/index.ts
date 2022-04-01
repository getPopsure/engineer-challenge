import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.get('/policies', async (req, res) => {
  const policies = await prisma.policy.findMany({
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
  res.send(policies);
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
