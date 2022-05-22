import Router from "express"
import {IndexController} from "../controllers/index.controller"
import {Express} from "express/ts4.0"

export const indexRoutes = (): Express => {
  const indexController: IndexController = new IndexController()

  const router: Express = Router()
  router.get("/", indexController.get)
  return router
}
