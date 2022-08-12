const Redis = require('ioredis')
const redisBlocking = new Redis({
  host: 'cache',
  port: 6379,
})

const redis = new Redis({
  host: 'cache',
  port: 6379,
})

import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const port = 4001
const prisma = new PrismaClient()

app.use(express.json())

app.get('/policiy-history', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Success' })
})

app.get('/', (req, res) => {
  res.send('Server is up and running 🚀')
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`)
})
