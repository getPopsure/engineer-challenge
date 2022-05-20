import Router from "express"
import {getRoot} from "../controllers/root"

export const indexRouter = Router().get("/", getRoot)