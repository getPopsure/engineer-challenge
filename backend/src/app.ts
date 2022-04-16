import express, { Request, Response } from "express";
import cors from "cors";
import controller from "./controller";
import { errorHandler } from "./error";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

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

export default app;
