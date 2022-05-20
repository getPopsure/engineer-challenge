import {PrismaClient} from "@prisma/client"
import {DeepMockProxy, mockDeep, mockReset} from "jest-mock-extended"

import prisma from "../src/db/prisma.client"

jest.mock("../src/db/prisma.client.ts", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
