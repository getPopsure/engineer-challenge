const Redis = require('ioredis')
import _ from 'lodash'

const redis = new Redis({
  host: 'redis',
  port: 6379,
})

import express from 'express'
import {
  PrismaClient,
  Prisma,
  FamilyMember,
  PolicyStatus,
} from '@prisma/client'
import { FamilyHistory } from './models/FamilyHistory'

const app = express()
const port = 4000
const prisma = new PrismaClient()

app.use(express.json())

/**
 * Policy seach route
 */
app.get('/policies', async (req, res) => {
  // Allowed sorting types
  enum sortTypes {
    asc = 'asc',
    desc = 'desc',
  }

  // search term
  const { search } = req.query
  // handle the skip and limit params for pagination
  let limit = Number(req.query?.limit) || 10
  let skip = Number(req.query?.skip) || 0

  // parsing the sort order data
  let order =
    (req.query?.order as Prisma.SortOrder) ||
    (sortTypes.asc as Prisma.SortOrder)

  try {
    // check the dynamodb for family member history
    const familyHistory = await FamilyHistory.query('firstName')
      .eq(search)
      .attributes(['policyId'])
      .exec()

    // get all related unique ids
    const uniqueIds = _.uniqBy(familyHistory.toJSON(), 'policyId').map(
      (policy: any) => policy.policyId,
    )

    // search query
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

    // find the paginated queries.
    // todo: use a cursor if possible with batching even
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
    // get the total number of pages for the pagination
    const totalPages = await prisma.policy.count()
    res.status(200).json({ policies, totalPages })
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: 'Bad Request' })
  }
})

/**
 * Add or Remove family members from a policy
 */
app.patch('/policies/:id/family-members', async (req, res) => {
  const { id } = req.params
  const { familyMembers, action } = req.body

  // allowed action types
  enum PolicyActionType {
    ADD = 'add',
    DELETE = 'delete',
  }

  try {
    // get the previous record to check if the policy exists and to determine the history
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

    // exit if there's no previous record if the policy has been cancelled
    if (!previousRecord || previousRecord.status === PolicyStatus.CANCELLED) {
      return res
        .status(400)
        .json({ message: 'Policy does not exist or has been canceled' })
    }

    // if there are family members guard condition
    if (!Array.isArray(familyMembers) || !familyMembers.length) {
      return res.status(400).json({ message: 'Empty Action' })
    }

    switch (action) {
      case PolicyActionType.ADD:
        {
          // determine the unique members and add
          // todo: add a check to determine if the update is needed or not. (already exists)
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
          // update the record and fetch family members for history
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
          // send to history-manager microservice for historical data processing
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
          // send to history-manager microservice for historical data processing
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
    // send a snapshot of the policy to the history-manager
    await redis.lpush(`QUEUE:POLICY_UPDATE`, JSON.stringify(previousRecord))
    res.status(200).json({ message: 'Successfully updated' })
  } catch (e) {
    res.status(400).json({ status: 'Bad Request' })
  }
})

app.patch('/policies/:id', async (req, res) => {
  try {
    const policy = req.body
    const { id } = req.params
    // immediately exit if the policy id is not present
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
    // check if there's a previousRecord
    if (!previousRecord) {
      return res.status(400).json({ message: 'Policy does not exist' })
    }

    // update the policy
    const updatedPolicy = await prisma.policy.update({
      where: {
        id,
      },
      data: policy,
    })

    if (!updatedPolicy) {
      // policy not found
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

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`)
})
