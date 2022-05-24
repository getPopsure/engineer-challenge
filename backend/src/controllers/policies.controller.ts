import {Request, Response} from "express/ts4.0"
import {
  CreatePolicyRequest,
  DeletePolicyRequest,
  GetPolicyHistoryRequest,
  PoliciesService,
  PoliciesValidator,
  SearchPolicyRequest,
  UpdatePolicyRequest
} from "../service/policies.service"
import {applicationLogger} from "../middlewares/logger.middleware"
import {Policy} from "@prisma/client"

export class PoliciesController {
  private _policiesService

  constructor(policiesService: PoliciesService) {
    this._policiesService = policiesService
  }

  public get = async (req: Request, res: Response) => {
    applicationLogger.debug("Got GET request", req, res)
    const searchPolicyRequest: SearchPolicyRequest = {query: req.query.toString()}

    res.json(await this._policiesService.searchPolicies(searchPolicyRequest))
  }

  public put = async (req: Request, res: Response) => {
    applicationLogger.debug("Got PUT request", req, res)
    const id: string = req.params.id
    const policy: Policy = {...req.body}
    const updatePolicyRequest = <UpdatePolicyRequest>{
      id: id,
      policy: policy
    }
    PoliciesValidator.validateUpdatePolicyRequest(updatePolicyRequest)
    res.json(await this._policiesService.updatePolicy(updatePolicyRequest))
  }

  public delete = async (req: Request, res: Response) => {
    applicationLogger.debug("Got DELETE request", req, res)
    const deleteRequest: DeletePolicyRequest = {id: req.params.id}
    PoliciesValidator.validateDeletePolicyRequest(deleteRequest)
    res.json(await this._policiesService.deletePolicy(deleteRequest))
  }

  public getHistory = async (req: Request, res: Response) => {
    applicationLogger.debug("Got GET history request", req, res)
    const getPolicyHistoryRequest: GetPolicyHistoryRequest = {
      policyId: req.params.policyId
    }
    PoliciesValidator.validateGetPolicyHistoryRequest(getPolicyHistoryRequest)
    res.json(await this._policiesService.getPolicyHistory(getPolicyHistoryRequest))
  }

  public post = async (req: Request, res: Response) => {

    applicationLogger.debug("Got POST request", req, res)
    const createPolicyRequest: CreatePolicyRequest = {
      policy: {...req.body}
    }
    PoliciesValidator.validateCreatePolicyRequest(createPolicyRequest)
    res.json(await this._policiesService.createPolicy(createPolicyRequest))
  }
}
