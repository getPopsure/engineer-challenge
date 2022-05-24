import {Context} from "../../src/global/context"
import {applicationLogger} from "../../src/middlewares/logger.middleware"

export const cleanupDB = async (context: Context) => {
  const [policies, customers, policyHistories] = await context.prisma.$transaction([
    context.prisma.policy.deleteMany({}),
    context.prisma.customer.deleteMany({}),
    context.prisma.policyHistory.deleteMany({})
  ])
  applicationLogger.debug("Cleaning up DB, deleted entries", policies, customers, policyHistories)
}
