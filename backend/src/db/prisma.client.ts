import {PrismaClient} from "@prisma/client"
import {Context} from "../global/context"

export const prisma = new PrismaClient()
export const getContext = (): Context => {
  return {
    prisma: prisma
  }
}
