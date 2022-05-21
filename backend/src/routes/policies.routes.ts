import Router from "express"
import {policiesController} from "../controllers/policies.controller"

export const policiesRouter = Router().get("/", policiesController)
