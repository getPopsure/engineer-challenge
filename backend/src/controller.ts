import { NextFunction, Request, Response } from "express";
import service from "./service";

const getPolicies = async (req: Request, res: Response, next: NextFunction) => {
  let policies;
  try {
    policies = await service.findPolicies(req.query.search);
    res.json(policies);
  } catch (error) {
    next(error);
  }
};

export default { getPolicies };
