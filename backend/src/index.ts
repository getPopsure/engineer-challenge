import express from "express"
import {BACKEND_PORT} from "./config/infra.config"
import {applicationLogger, errorLogger, logger} from "./middlewares/logger.middleware"
import {errorHandler} from "./middlewares/error.handler.middleware"
import prisma from "./db/prisma.client"
import {indexRoutes} from "./routes/index.routes"
import {policiesRoutes} from "./routes/policies.routes"
import {getContext} from "./context"

export const app = express()

app.use(express.json())
app.use(logger)
app.use("/", indexRoutes())
const context = getContext()
app.use("/policies", policiesRoutes(context))
app.use(errorLogger)
app.use(errorHandler)

export const server = app.listen(BACKEND_PORT, async () => {
  applicationLogger.info(`🚀  Server ready at ${BACKEND_PORT}`)
  Promise.resolve(prisma.$queryRaw`SELECT now();`).then((result) => {
    applicationLogger.info(`Prisma client has validated ${result}`)
  }).catch((e) => {
    applicationLogger.error("Got error while validating prisma client", e)
    process.exit(1)
  })
})
