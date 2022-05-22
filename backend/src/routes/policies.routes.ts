import Router from "express"
import {PoliciesController} from "../controllers/policies.controller"
import {PoliciesService} from "../service/policies.service"
import {Context} from "../context"
import {Express} from "express/ts4.0"

export const policiesRoutes = (context: Context): Express => {
  const service: PoliciesService = new PoliciesService(context)
  const controller: PoliciesController = new PoliciesController(service)

  const router: Express = Router()
  router.get("/", controller.get)
  router.post("/", controller.post)
  return router
}
