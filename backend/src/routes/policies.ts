import Router from "express"
import {getPolicies} from "../controllers/policies"

export const policiesRouter = Router().get("/", getPolicies)