const Redis = require('ioredis')
const redisBlocking = new Redis({
  host: 'redis',
  port: 6379,
})

const redis = new Redis({
  host: 'redis',
  port: 6379,
})

import express, { Request, Response } from 'express'
import { PrismaClient, Prisma, PolicyHistory } from '@prisma/client'
import { createPolicyHistory } from './services/policy-history.service'
const app = express()
const port = 4001
const prisma = new PrismaClient()

app.use(express.json())

async function ProcessHistoricalEvent(event: any, eventType: string) {
  try {
    switch (eventType) {
      case 'POLICY_UPDATED':
        {
          const historyicalEvent: any = createPolicyHistory(event, eventType)
          console.log(historyicalEvent)
          console.log(createPolicyHistory)
          if (event) {
            const policyHistory = await prisma.policyHistory.create({
              data: historyicalEvent,
            })
            if (!policyHistory) {
              console.log('Hisforical event failed to create')
            }
          }
        }
        break
      default:
        console.log('Invalid event type: ' + eventType)
    }
  } catch (e) {
    console.log('historyical event failed', event, e)
    return
  }
}

function HistoryEventHandler() {
  redisBlocking.brpop(`QUEUE:POLICY_UPDATE`, 5).then(async (data: any) => {
    if (data && Array.isArray(data) && data.length > 1) {
      if (data[0] === 'QUEUE:POLICY_UPDATE') {
        console.log(`Saving history for  POLICY_UPDATE ${data[1]}`)
        await ProcessHistoricalEvent(JSON.parse(data[1]), 'POLICY_UPDATED')
      }
    }

    HistoryEventHandler()
  })
}

HistoryEventHandler()

app.get('/policy-history', async (req: Request, res: Response) => {
  const history = await await prisma.policyHistory.findMany()
  res.status(200).json(history)
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`)
})
