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
import { PrismaClient, Prisma } from '@prisma/client'

const app = express()
const port = 4001
const prisma = new PrismaClient()

app.use(express.json())

app.get('policy-history', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' })
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`)
})
