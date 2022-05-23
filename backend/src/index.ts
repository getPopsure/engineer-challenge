import express from "express"
import {BACKEND_PORT} from "./config/infra.config"
import {applicationLogger, errorLogger, requestLogger} from "./middlewares/logger.middleware"
import {errorHandler} from "./middlewares/error.handler.middleware"
import {indexRoutes} from "./routes/index.routes"
import {policiesRoutes} from "./routes/policies.routes"
import {getContext} from "./db/prisma.client"


export const app = express()
const context = getContext()

app.use(express.json())
app.use(requestLogger)
app.use("/", indexRoutes())
app.use("/policies", policiesRoutes(context))
app.use(errorLogger)
app.use(errorHandler)

export const server = app.listen(BACKEND_PORT, async () => {
  applicationLogger.info(`🚀  Server ready at ${BACKEND_PORT}`)
  Promise.resolve(context.prisma.$queryRaw`SELECT now();`).then((result) => {
    applicationLogger.info(`Prisma client has validated ${result}`)
  }).catch((e) => {
    applicationLogger.error("Got error while validating prisma client", e)
    process.exit(1)
  })
})
