const Redis = require('ioredis')
import _ from 'lodash'

const redis = new Redis({
  host: 'redis',
  port: 6379,
})

import express from 'express'
import { PrismaClient, Prisma, FamilyMember } from '@prisma/client'
import { FamilyHistory } from './models/FamilyHistory'

const app = express()
const port = 4000
const prisma = new PrismaClient()

app.use(express.json())

app.get('/policies', async (req, res) => {
  enum sortTypes {
    asc = 'asc',
    desc = 'desc',
  }

  const { search } = req.query
  // handle the skip and limit params
  let limit = Number(req.query?.limit) || 10
  let skip = Number(req.query?.skip) || 0
  let order =
    (req.query?.order as Prisma.SortOrder) ||
    (sortTypes.asc as Prisma.SortOrder)
  try {
    const familyHistory = await FamilyHistory.query('firstName')
      .eq(search)
      .attributes(['policyId'])
      .exec()
    const uniqueIds = _.uniqBy(familyHistory.toJSON(), 'policyId').map(
      (policy: any) => policy.policyId,
    )
    const or: Prisma.PolicyWhereInput = search
      ? {
          OR: [
            { id: { in: uniqueIds } },
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
            {
              familyMembers: {
                some: {
                  OR: [
                    {
                      firstName: {
                        contains: search as string,
                        mode: 'insensitive',
                      },
                    },
                    {
                      lastName: {
                        contains: search as string,
                        mode: 'insensitive',
                      },
                    },
                  ],
                },
              },
            },
          ],
        }
      : {}

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
    console.log(e)
    res.status(400).json({ message: 'Bad Request' })
  }
})

app.patch('/policies/:id/family-members', async (req, res) => {
  const { id } = req.params
  const { familyMembers, action } = req.body
  enum PolicyActionType {
    ADD = 'add',
    DELETE = 'delete',
  }
  try {
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

    if (!Array.isArray(familyMembers) || !familyMembers.length) {
      return res.status(400).json({ message: 'Empty Action' })
    }

    switch (action) {
      case PolicyActionType.ADD:
        {
          const query = _.uniqBy(
            [
              ...previousRecord.familyMembers.map(
                (familyMember: FamilyMember) => {
                  return { id: familyMember.id }
                },
              ),
              ...familyMembers.map((familyMember: FamilyMember) => {
                return { id: familyMember.id }
              }),
            ],
            'id',
          )

          const updateUser = await prisma.policy.update({
            where: {
              id,
            },
            data: {
              familyMembers: {
                set: query as any,
              },
            },
            include: {
              familyMembers: true,
            },
          })
          console.log('updateUser', updateUser)
          const idList = query.map((member) => member.id)
          await redis.lpush(
            `QUEUE:FAMILY_MEMBER_ADD`,
            JSON.stringify(
              updateUser.familyMembers.filter((familyMember) =>
                idList.includes(familyMember.id),
              ),
            ),
          )
        }
        break
      case PolicyActionType.DELETE:
        {
          const updateUser = await prisma.policy.update({
            where: {
              id,
            },
            data: {
              familyMembers: {
                disconnect: familyMembers,
              },
            },
            include: {
              familyMembers: true,
            },
          })
          console.log('updateUser', updateUser)
          const idList = familyMembers.map((familyMember) => familyMember.id)
          await redis.lpush(
            `QUEUE:FAMILY_MEMBER_DELETE`,
            JSON.stringify(
              previousRecord.familyMembers.filter((familyMember) =>
                idList.includes(familyMember.id),
              ),
            ),
          )
        }
        break
      default: {
        return res.status(400).json({ message: 'Invalid Action' })
      }
    }
    await redis.lpush(`QUEUE:POLICY_UPDATE`, JSON.stringify(previousRecord))
    res.status(200).json({ message: 'Successfully updated' })
  } catch (e) {
    console.log(e)
    res.status(400).json({ status: 'Bad Request' })
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

    const updatedPolicy = await prisma.policy.update({
      where: {
        id,
      },
      data: policy,
    })

    if (!updatedPolicy) {
      return res.status(400).json({ message: 'Policy not found' })
    }
    // emit history event
    await redis.lpush(`QUEUE:POLICY_UPDATE`, JSON.stringify(previousRecord))
    // return then updated policy
    res.status(200).json(updatedPolicy)
  } catch (e) {
    res.status(400).json({ message: 'Bad Request' })
  }
})

app.get('/f/:id', async (req, res) => {
  try {
    const fm = await prisma.familyMember.findUnique({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(fm)
  } catch (e) {
    res.status(400).json({ message: 'Bad Request' })
  }
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`)
})
