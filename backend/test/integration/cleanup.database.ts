import {Context} from "../../src/global/context"

export const cleanupDB = async (context: Context) => {
  await context.prisma.policy.deleteMany({})
  await context.prisma.customer.deleteMany({})
}
