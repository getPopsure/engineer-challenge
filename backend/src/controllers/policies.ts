import {Handler, Request, Response} from "express/ts4.0"
import {parseWhereInput, servePolicies} from "../models/policies"

export const getPolicies: Handler = async (req: Request, res: Response) => {
  const {search} = req.query

  const whereInput = parseWhereInput(search?.toString())
  try {
    const policies = await servePolicies(whereInput)
    res.json(policies)
  } catch (e) {
    res.send(500)
  }
}