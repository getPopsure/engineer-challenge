import {describe, expect} from "@jest/globals"
import {parseWhereInput, servePolicies} from "../../src/service/policies.service"
import {InsuranceType, Policy, PolicyStatus, Prisma} from "@prisma/client"
import {createMockContext, PrismaClientMock} from "../prisma.client.mock"
import {Context} from "../../src/context"


let mockCtx: PrismaClientMock
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx
})

describe("Test the policies model", () => {
  describe("parseWhereInput", () => {
    it("Should return correct query", (done) => {
      const query: Prisma.PolicyWhereInput = parseWhereInput("JohnSmith")
      expect(query.OR).toContainEqual({provider: {contains: "JohnSmith", mode: "insensitive"}})
      expect(query.OR).toContainEqual({customer: {firstName: {contains: "JohnSmith", mode: "insensitive"}}})
      expect(query.OR).toContainEqual({customer: {lastName: {contains: "JohnSmith", mode: "insensitive"}}})
      done()
    })
  })

  describe("servePolicies", () => {
    it("Should return correct model when matched", done => {
      const policy: Policy = {
        id: "1",
        customerId: "1",
        provider: "google",
        insuranceType: InsuranceType.HEALTH,
        status: PolicyStatus.ACTIVE,
        startDate: new Date(),
        endDate: null,
        createdAt: new Date()
      }

      const query: Prisma.PolicyWhereInput = {
        OR: [
          {provider: {contains: "JohnSmith", mode: "insensitive"}},
          {customer: {firstName: {contains: "JohnSmith", mode: "insensitive"}}},
          {customer: {lastName: {contains: "JohnSmith", mode: "insensitive"}}}
        ]
      }
      mockCtx.prisma.policy.findMany.mockResolvedValue([policy])

      servePolicies(query, ctx).then((result) => {
        expect(result).toContain(policy)
        done()
      })
    })
  })
})
