import {Request, Response} from "express/ts4.0"
import {PoliciesService} from "../service/policies.service"

export class PoliciesController {
  private _policiesService

  constructor(policiesService: PoliciesService) {
    this._policiesService = policiesService
  }

  public get = async (req: Request, res: Response) => {
    const {search} = req.query

    const whereInput = this._policiesService.parseWhereInput(search?.toString())

    const policies = await this._policiesService.searchPolicies(whereInput)
    res.json(policies)
  }

  public post = async (req: Request, res: Response) => {
  }
}
