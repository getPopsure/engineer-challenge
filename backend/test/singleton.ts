import {PrismaClient} from "@prisma/client"
import {DeepMockProxy, mockDeep} from "jest-mock-extended"

import prisma from "../src/db/prisma.client"

jest.mock("../src/db/prisma.client.ts", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
