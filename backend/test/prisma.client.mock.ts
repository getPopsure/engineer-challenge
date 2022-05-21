import {DeepMockProxy, mockDeep} from "jest-mock-extended"
import {PrismaClient} from "@prisma/client"

export type PrismaClientMock = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): PrismaClientMock => {
  return {
    prisma: mockDeep<PrismaClient>()
  }
}
