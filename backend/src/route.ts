import { Request, Response } from "express";
import controller from "./controller";

const getPolicies = async (req: Request, res: Response) => {
  const policies = await controller.getPolicies(req.query);
  res.json(policies);
};

export default { getPolicies };
