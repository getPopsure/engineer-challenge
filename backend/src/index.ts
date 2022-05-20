import express from "express"
import {BACKEND_PORT} from "./config/infra.config"
import {errorLogger, logger} from "./middlewares/logger"
import {indexRouter} from "./routes/root"
import {policiesRouter} from "./routes/policies"
import {errorHandler} from "./middlewares/error.handler"

const app = express()
console.log("Prisma client initialized")

app.use(express.json())
app.use(logger)
app.use("/", indexRouter)
app.use("/policies", policiesRouter)
app.use(errorLogger)
app.use(errorHandler)

app.listen(BACKEND_PORT, () => {
  console.log(`🚀  Server ready at ${BACKEND_PORT}`)
})
