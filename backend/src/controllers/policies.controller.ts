import {Request, Response} from "express/ts4.0"
import {PoliciesService} from "../service/policies.service"
import {applicationLogger} from "../middlewares/logger.middleware"

export class PoliciesController {
  private _policiesService

  constructor(policiesService: PoliciesService) {
    this._policiesService = policiesService
  }

  public get = async (req: Request, res: Response) => {
    applicationLogger.debug("Got GET request", req, res)
    const search = {query: req.query.toString()}

    const policies = await this._policiesService.searchPolicies(search)
    res.json(policies)
  }

  public post = async (req: Request, res: Response) => {
    applicationLogger.debug("Got POST request", req, res)
  }
}
