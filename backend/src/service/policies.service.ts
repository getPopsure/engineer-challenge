import {Prisma} from "@prisma/client"
import {applicationLogger} from "../middlewares/logger.middleware"
import {Context, getContext} from "../context"

export const parseWhereInput = (search?: string): Prisma.PolicyWhereInput => {
  applicationLogger.info("Serve policies for input " + search)
  return search
    ? {
      OR: [
        {provider: {contains: search, mode: "insensitive"}},
        {customer: {firstName: {contains: search, mode: "insensitive"}}},
        {customer: {lastName: {contains: search, mode: "insensitive"}}}
      ]
    }
    : {}
}

export const servePolicies = (query?: Prisma.PolicyWhereInput, context: Context = getContext()) => {
  applicationLogger.info("Serve policies for input " + (query as string))
  return context.prisma.policy.findMany({
    where: {
      ...query
    },
    select: {
      id: true,
      provider: true,
      insuranceType: true,
      status: true,
      startDate: true,
      endDate: true,
      customer: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          dateOfBirth: true
        }
      }
    }
  })
}