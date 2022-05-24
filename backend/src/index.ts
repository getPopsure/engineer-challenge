import express from "express"
import {BACKEND_PORT} from "./config/infra.config"
import {applicationLogger, errorLogger, requestLogger} from "./middlewares/logger.middleware"
import {errorHandler} from "./middlewares/error.handler.middleware"
import {indexRoutes} from "./routes/index.routes"
import {policiesRoutes} from "./routes/policies.routes"
import {getContext} from "./db/prisma.client"

require("express-async-errors")
const jsonStringifyDate = require("json-stringify-date")

export const app = express()
const context = getContext()

app.use(express.json({reviver: jsonStringifyDate.getReviver()}))
app.use(requestLogger)
app.use("/", indexRoutes())
app.use("/policies", policiesRoutes(context))
app.use(errorLogger)
app.use(errorHandler)

export const server = app.listen(BACKEND_PORT, async () => {
  applicationLogger.info(`🚀  Server ready at ${BACKEND_PORT}`)
  try {
    await context.prisma.$queryRaw`SELECT now();`
    applicationLogger.info(" ‍🌈⃤  Prisma client has validated")
  } catch (e) {
    applicationLogger.error("Got error while validating prisma client", e)
    process.exit(1)
  }
})
