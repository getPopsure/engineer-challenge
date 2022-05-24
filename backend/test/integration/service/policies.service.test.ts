import {describe, test} from "@jest/globals";
import {CustomerService} from "../../../src/service/customer.service"
import {PoliciesService} from "../../../src/service/policies.service"
import {getContext} from "../../../src/db/prisma.client"
import {cleanupDB} from "../cleanup.database"
import {InsuranceType, Policy, PolicyChangeType, PolicyStatus} from "@prisma/client"
import {server} from "../../../src"
import {any} from "jest-mock-extended"
import {randomUUID} from "crypto"
import {now} from "../../../src/util/util"
import {NotFoundException} from "../../../src/exceptions"


let customerService: CustomerService
let policiesService: PoliciesService
let customerId: string

beforeAll(done => {
  customerService = new CustomerService(getContext())
  policiesService = new PoliciesService(getContext())
  cleanupDB(getContext()).then(() => done())
})

afterAll(done => {
  getContext().prisma.$disconnect()
  server.close(() => done())
})

afterEach(done => {
  cleanupDB(getContext()).then(() => done())
})

beforeEach(done => {
  customerService.createCustomer({
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: now()
  }).then(customer => {
    customerId = customer.id
  }).then(() => done())
})

describe("createPolicy", () => {
  test("Should create a new policy", done => {
    const timestamp = now()
    policiesService.createPolicy({
      policy: {
        customerId: customerId,
        status: PolicyStatus.ACTIVE,
        endDate: null,
        startDate: timestamp,
        provider: "google",
        insuranceType: InsuranceType.HEALTH
      }
    }).then(policy => {
      expect(policy).toEqual({
        id: expect.any(String),
        status: PolicyStatus.ACTIVE,
        endDate: null,
        startDate: timestamp,
        createdAt: expect.any(Date),
        provider: "google",
        insuranceType: InsuranceType.HEALTH,
        customerId: customerId
      })
      done()
    })
  })
})

describe('updatePolicy', () => {
  test("Should update policy in the DB and create history entry when policy exists", done => {
    createPolicy(customerId).then(initial => {
      const timestamp: Date = now()
      policiesService.updatePolicy({
        id: initial.id,
        policy: {
          endDate: timestamp,
          insuranceType: InsuranceType.HOUSEHOLD,
        }
      }).then(updated => {
        expect(updated).toEqual({
          id: any(String),
          customerId: customerId,
          createdAt: initial.createdAt,
          provider: initial.provider,
          status: initial.status,
          startDate: initial.startDate,
          endDate: timestamp,
          insuranceType: InsuranceType.HOUSEHOLD
        })
        getContext().prisma.policyHistory.findMany({
          where: {
            policyId: initial.id
          }
        }).then(policyHistories => {
          expect(policyHistories.length).toBe(1)
          expect(policyHistories).toContainEqual({
            id: any(String),
            policyId: initial.id,
            customerId: customerId,
            policyCreatedAt: initial.createdAt,
            createdAt: any(String),
            provider: initial.provider,
            status: initial.status,
            startDate: initial.startDate,
            endDate: initial.endDate,
            insuranceType: initial.insuranceType,
            policyChangeType: PolicyChangeType.UPDATE
          })
          done()
        })
      })
    })
  })

  test("Should throw error when policy doesn't exist", done => {
    const policyId = randomUUID()
    policiesService.updatePolicy({
      id: policyId,
      policy: {
        endDate: now(),
        insuranceType: InsuranceType.HOUSEHOLD,
      }
    }).catch(e => {
      expect(e).toEqual(new NotFoundException("Policy with id " + policyId + " not found"))
      done()
    })
  })
})

describe('deletePolicy', () => {
  test("Should delete existing policy and create history entry in DB when policy exists", done => {
    createPolicy(customerId).then(initial => {
      policiesService.deletePolicy({
        id: initial.id
      }).then(deleted => {
        expect(deleted.id).toEqual(initial.id)
        getContext().prisma.policy.findMany({
          where: {
            id: initial.id
          }
        }).then(dbPolicies => {
          expect(dbPolicies).toEqual([])
          getContext().prisma.policyHistory.findMany({
            where: {
              policyId: initial.id
            }
          }).then(policyHistories => {
            expect(policyHistories.length).toBe(1)
            expect(policyHistories).toContainEqual({
              id: any(String),
              policyId: initial.id,
              customerId: customerId,
              policyCreatedAt: initial.createdAt,
              createdAt: any(String),
              provider: initial.provider,
              status: initial.status,
              startDate: initial.startDate,
              endDate: initial.endDate,
              insuranceType: initial.insuranceType,
              policyChangeType: PolicyChangeType.DELETE
            })
            done()
          })
        })
      })
    })
  })

  test("Should throw error when policy doesn't exist", done => {
    const policyId = randomUUID()
    policiesService.deletePolicy({
      id: policyId
    }).catch(e => {
      expect(e).toEqual(new NotFoundException("Policy with id " + policyId + " not found"))
      done()
    })
  })
})

describe("getHistory", () => {
  test("Should return empty list when no changes exist for policy", done => {
    createPolicy(customerId).then(initialPolicy => {
      policiesService.updatePolicy({
        id: initialPolicy.id,
        policy: {...initialPolicy, provider: "new-feather"}
      }).then(() => {
        policiesService.getPolicyHistory({policyId: randomUUID()})
          .then(histories => {
            expect(histories).toEqual([])
          })
        done()
      })
    })
  })


  test("Should return histories for changed policies", done => {
    createPolicy(customerId).then(initialPolicy => {
      policiesService.updatePolicy({
        id: initialPolicy.id,
        policy: {...initialPolicy, provider: "new-feather"}
      }).then(policy => {
        policiesService.getPolicyHistory({policyId: policy.id})
          .then(histories => {
            expect(histories.length).toEqual(1)
            expect(histories).toContainEqual({
              id: any(String),
              createdAt: any(String),
              policyId: initialPolicy.id,
              customerId: initialPolicy.customerId,
              insuranceType: initialPolicy.insuranceType,
              startDate: initialPolicy.startDate,
              endDate: initialPolicy.endDate,
              policyCreatedAt: initialPolicy.createdAt,
              provider: initialPolicy.provider,
              status: initialPolicy.status,
              policyChangeType: PolicyChangeType.UPDATE
            })
          })
        done()
      })
    })
  })
})

const createPolicy = async (customerId: string): Promise<Policy> => {
  return getContext().prisma.policy.create({
    data: {
      startDate: now(),
      status: PolicyStatus.ACTIVE,
      provider: "feather",
      insuranceType: InsuranceType.HEALTH,
      customer: {
        connect: {
          id: customerId
        }
      }
    }
  }).then(created => {
    return {
      ...created as unknown as Policy
    }
  })
}
