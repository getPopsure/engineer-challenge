import {describe, expect} from "@jest/globals"
import {InsuranceType, Policy, PolicyStatus, Prisma} from "@prisma/client"
import {createMockContext, PrismaClientMock} from "../prisma.client.mock"
import {PoliciesService} from "../../src/service/policies.service"


let mockCtx: PrismaClientMock
let policiesService: PoliciesService

beforeEach(done => {
  mockCtx = createMockContext()
  policiesService = new PoliciesService(mockCtx)
  done()
})

describe("Test the policies model", () => {
  describe("parseWhereInput", () => {
    it("Should return correct query", (done) => {
      const query: Prisma.PolicyWhereInput = policiesService._parseWhereInput({
        query: "JohnSmith"
      })
      expect(query.OR).toContainEqual({provider: {contains: "JohnSmith", mode: "insensitive"}})
      expect(query.OR).toContainEqual({customer: {firstName: {contains: "JohnSmith", mode: "insensitive"}}})
      expect(query.OR).toContainEqual({customer: {lastName: {contains: "JohnSmith", mode: "insensitive"}}})
      done()
    })
  })

  describe("servePolicies", () => {
    it("Should return empty list when no policies exist", done => {

      mockCtx.prisma.policy.findMany.mockResolvedValue([])

      policiesService.searchPolicies().then((result: any) => {
        expect(result).toEqual([])
      }).finally(done)
    })

    it("Should return correct model when it's present", done => {
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

      mockCtx.prisma.policy.findMany.mockResolvedValue([policy])

      policiesService.searchPolicies().then((result: any) => {
        expect(result).toContain(policy)
      }).finally(done)
    })
  })
})
