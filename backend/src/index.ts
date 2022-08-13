const Redis = require('ioredis')
const redisBlocking = new Redis({
  host: 'redis',
  port: 6379,
})

const redis = new Redis({
  host: 'redis',
  port: 6379,
})

import express from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const app = express()
const port = 4000
const prisma = new PrismaClient()

app.use(express.json())

app.get('/policies', async (req, res) => {
  enum sortTypes {
    asc = 'asc',
    desc = 'desc',
  }
  const myOldCursor = 200

  const { search } = req.query
  const orderByFields = ['provider', 'firstName', 'lastName']
  // handle the skip and limit params
  let limit = Number(req.query?.limit) || 10
  let skip = Number(req.query?.skip) || 0
  let order =
    (req.query?.order as Prisma.SortOrder) ||
    (sortTypes.asc as Prisma.SortOrder)

  const or: Prisma.PolicyWhereInput = search
    ? {
        OR: [
          { provider: { contains: search as string, mode: 'insensitive' } },
          {
            customer: {
              firstName: { contains: search as string, mode: 'insensitive' },
            },
          },
          {
            customer: {
              lastName: { contains: search as string, mode: 'insensitive' },
            },
          },
        ],
      }
    : {}

  try {
    const policies = await prisma.policy.findMany({
      skip,
      take: limit,
      orderBy: [
        {
          provider: order,
        },
        {
          customer: {
            firstName: order,
          },
        },
        {
          customer: {
            lastName: order,
          },
        },
      ],
      where: {
        ...or,
      },
      select: {
        id: true,
        provider: true,
        insuranceType: true,
        status: true,
        startDate: true,
        endDate: true,
        familyMembers: true,
        customer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true,
          },
        },
      },
    })
    const totalPages = await prisma.policy.count()
    res.json({ policies, totalPages })
  } catch (e) {
    res.status(400).json({ message: 'Bad Request' })
  }
})

app.patch('/policies/:id', async (req, res) => {
  try {
    const policy = req.body
    const { id } = req.params
    if (!policy) {
      return res.status(400).json({ message: 'Invalid Policy Data' })
    }

    // query old data
    const previousRecord = await prisma.policy.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        provider: true,
        insuranceType: true,
        status: true,
        startDate: true,
        endDate: true,
        customer: true,
        familyMembers: true,
      },
    })
    if (!previousRecord) {
      return res.status(400).json({ message: 'Policy does not exist' })
    }

    // emit history event
    await redis.lpush(`QUEUE:POLICY_UPDATE`, JSON.stringify(previousRecord))

    // check if policy exists and update policy
    const updatedPolicy = await prisma.policy.update({
      where: {
        id,
      },
      data: policy,
    })

    if (!updatedPolicy) {
      return res.status(400).json({ message: 'Policy not found' })
    }
    // return then updated policy
    res.status(200).json(updatedPolicy)
  } catch (e) {
    res.status(400).json({ message: 'Bad Request' })
  }
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`)
})
