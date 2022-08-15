import _ from 'lodash'
import express from 'express'
import { connectDynamodb } from './datastore'
import routes from './modules'

// initialize dynamodb
connectDynamodb()

const app = express()
const port = 4000

app.use(express.json())
routes(app)

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`)
})
