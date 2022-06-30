import { NextFunction, Request, Response } from "express";
import services from "./services";

const getPolicies = async (req: Request, res: Response, next: NextFunction) => {
  let policies;
  try {
    policies = await services.findPolicies(req.query.search);
    res.json(policies);
  } catch (error) {
    next(error);
  }
};

export default { getPolicies };
