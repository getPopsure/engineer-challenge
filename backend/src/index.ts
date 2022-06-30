import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient, Prisma, InsuranceType, PolicyStatus } from '@prisma/client';
import { errorHandler } from './error';
import controller from './controller';

const app = express();
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const routes = [
  { path: "/policies", handler: controller.getPolicies },
  {
    path: "/",
    handler: (req: Request, res: Response) => {
      res.send("Server is up and running 🚀");
    },
  },
];
routes.map((route) => app.route(route.path).get(route.handler));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`);
});
