import express from "express"
import {BACKEND_PORT} from "./config/infra.config"
import {errorLogger, logger} from "./middlewares/logger.middleware"
import {indexRouter} from "./routes/index.routes"
import {policiesRouter} from "./routes/policies.routes"
import {errorHandler} from "./middlewares/error.handler.middleware"
import prisma from "./db/prisma.client"

export const app = express()
export const server = app.listen(BACKEND_PORT, () => {
  console.log(`🚀  Server ready at ${BACKEND_PORT}`)
})

Promise.resolve(prisma.$queryRaw`SELECT now();`).then((result) => {
  app.use(express.json())
  app.use(logger)
  app.use("/", indexRouter)
  app.use("/policies", policiesRouter)
  app.use(errorLogger)
  app.use(errorHandler)
}).catch((e) => {
  console.error(e)
  process.exit(1)
})
