const Redis = require('ioredis')
import express, { Request, Response } from 'express'
import {
  createFamilyHistory,
  createPolicyHistory,
} from './utils/policy-history.util'
import { HistoricalEvent } from './models/HistoricalEvent'
import { FamilyHistory } from './models/FamilyHistory'

const redisBlocking = new Redis({
  host: 'redis',
  port: 6379,
})

const app = express()
const port = 4001

app.use(express.json())

/**
 * Process HistricalEvents
 * @param event
 * @param eventType
 * @returns
 */
async function ProcessHistoricalEvent(event: any, eventType: string) {
  try {
    switch (eventType) {
      case 'POLICY_UPDATE':
        {
          // create event
          const historyicalEvent: any = createPolicyHistory(event, eventType)
          console.log(historyicalEvent)
          console.log(createPolicyHistory)
          if (event) {
            // save events in dynamodg
            const policyHistory = await HistoricalEvent.create(historyicalEvent)
            if (!policyHistory) {
              console.log('Hisforical event failed to create')
            }
          }
        }
        break
      case 'FAMILY_MEMBER_ADD':
      case 'FAMILY_MEMBER_DELETE':
        {
          // process only if the array is not empty
          if (event && Array.isArray(event) && event.length) {
            const memberHistory = event.map((familyMember: any) =>
              createFamilyHistory(familyMember, eventType),
            )
            console.log(memberHistory)
            // create records for each entry
            memberHistory.map(async (familyMember: any) => {
              const dbHistroy = await FamilyHistory.create(familyMember)
              if (!dbHistroy) {
                console.log('family Historical event failed to create')
              }
            })
          } else {
            console.log('received an empty event')
          }
        }
        break
      default:
        console.log('Invalid event type: fuic ' + eventType)
    }
  } catch (e) {
    console.log('historyical event failed', event, e)
    return
  }
}

/**
 * Historical event lister
 */
function HistoryEventHandler() {
  // listen for events from blocking queue
  redisBlocking
    .brpop(
      `QUEUE:POLICY_UPDATE`,
      `QUEUE:FAMILY_MEMBER_ADD`,
      `QUEUE:FAMILY_MEMBER_DELETE`,
      5,
    )
    .then(async (data: any) => {
      // format the data
      if (data && Array.isArray(data) && data.length > 1) {
        switch (data[0]) {
          case 'QUEUE:FAMILY_MEMBER_ADD':
          case 'QUEUE:FAMILY_MEMBER_DELETE':
          case 'QUEUE:POLICY_UPDATE':
            {
              console.log(`Saving history for  ${data[0]} ${data[1]}`)
              await ProcessHistoricalEvent(
                JSON.parse(data[1]),
                data[0].split(':')[1],
              )
            }
            break
          default: {
            // fallback
            console.log('invalid event type fallback: ' + data[0])
            return
          }
        }
      }

      HistoryEventHandler()
    })
}

HistoryEventHandler()

/**
 * Fetch Policy history by  id from dynamodb
 */
app.get('/policy-history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const history = await HistoricalEvent.query('policyId').eq(id).exec()
    res.status(200).json(history)
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: 'Bad Request' })
  }
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`)
})
