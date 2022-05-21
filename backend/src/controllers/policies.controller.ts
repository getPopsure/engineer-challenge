import {Handler, Request, Response} from "express/ts4.0"
import {parseWhereInput, servePolicies} from "../service/policies.service"

export const policiesController: Handler = async (req: Request, res: Response) => {
  const {search} = req.query

  const whereInput = parseWhereInput(search?.toString())

  const policies = await servePolicies(whereInput)
  res.json(policies)
}
