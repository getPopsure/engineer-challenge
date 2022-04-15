import express, { Request, Response } from "express";
import cors from "cors";
import route from "./route";

const app = express();
const ORIGIN_WHITELIST = "http://localhost:3000";

app.use(cors({ origin: ORIGIN_WHITELIST }));
app.use(express.json());

const routes = [
  { path: "/policies", handler: route.getPolicies },
  {
    path: "/",
    handler: (req: Request, res: Response) => {
      res.send("Server is up and running 🚀");
    },
  },
];
routes.map((route) => app.route(route.path).get(route.handler));

export default app;
