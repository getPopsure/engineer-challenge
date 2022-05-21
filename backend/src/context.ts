import {PrismaClient} from "@prisma/client"
import prisma from "./db/prisma.client"

export type Context = {
  prisma: PrismaClient
}

export const getContext = (): Context => {
  return {
    prisma: prisma
  }
}
