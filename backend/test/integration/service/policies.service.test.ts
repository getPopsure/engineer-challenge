import {describe, test} from "@jest/globals";
import {CustomerService} from "../../../src/service/customer.service"
import {PoliciesService} from "../../../src/service/policies.service"
import {getContext} from "../../../src/db/prisma.client"
import {cleanupDB, createCustomer, createPolicies, createPolicy} from "../util"
import {InsuranceType, PolicyChangeType, PolicyStatus} from "@prisma/client"
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
  createCustomer().then(id => {
    customerId = id
  }).then(() => done())
})

describe("searchPolicy", () => {
  test("Should return all policies when no search specified", done => {
    const timestamp = now()
    const policies = []
    for (let i = 0; i < 10; i++) {
      policies.push({
        endDate: null,
        startDate: timestamp,
        status: PolicyStatus.ACTIVE,
        provider: 'feather',
        insuranceType: InsuranceType.HEALTH,
        customerId: customerId
      })
    }

    getContext().prisma.policy.createMany({
      data: policies
    }).then(() => {
      policiesService.searchPolicies().then(result => {
        expect(result).toBeInstanceOf(Array)
        expect(result.length).toEqual(10)
        done()
      })
    })
  })

  test("Should return empty array when nothing matched", done => {
    createPolicies(10, customerId).then(() => {
      policiesService.searchPolicies({
        query: "NotExisting"
      }).then(result => {
        expect(result).toBeInstanceOf(Array)
        expect(result.length).toBe(0)
        done()
      })
    })
  })

  test("Should take pager into account when returning requests", done => {
    createPolicies(10, customerId).then(() => {
      policiesService.searchPolicies({
        pager: {
          skip: 3,
          take: 3
        }
      }).then(result => {
        expect(result).toBeInstanceOf(Array)
        expect(result.length).toBe(3)
        policiesService.searchPolicies({
          pager: {
            skip: 8,
            take: 5
          }
        }).then(result => {
          expect(result).toBeInstanceOf(Array)
          expect(result.length).toBe(2)
          done()
        })
      })
    })
  })
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
