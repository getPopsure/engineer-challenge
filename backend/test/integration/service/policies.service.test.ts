import {describe} from "@jest/globals"
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


let policiesService: PoliciesService
let customerId: string

beforeAll(done => {
  new CustomerService(getContext())
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

describe("Policies Service", () => {
  describe("searchPolicy", () => {
    it("Should not return deleted policies in the text search", done => {
      createPolicy(customerId).then(firstPolicy => {
        createPolicy(customerId).then(secondPolicy => {
          policiesService.deletePolicy({
            id: secondPolicy.id
          }).then(() => {
            policiesService.searchPolicies({}).then(result => {
              expect(result.length).toBe(1)
              expect(result).toContainEqual({
                ...firstPolicy
              })
            })
            done()
          })
        })
      })
    })

    it("Should return all policies when no search specified", done => {
      createPolicies(10, customerId).then(() => {
        policiesService.searchPolicies({}).then(result => {
          expect(result).toBeInstanceOf(Array)
          expect(result.length).toBe(10)
          done()
        })
      })
    })

    it("Should return empty array when nothing matched", done => {
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

    it("Should take pager into account when returning requests", done => {
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

    it("Should return policies with match in previous customer family members", done => {
      createPolicies(10, customerId)
      createPolicy(customerId, [{firstName: "Eva", lastName: "Smith"}]).then(policy => {
        policiesService.updatePolicy({
          id: policy.id,
          policy: {
            familyMembers: null
          }
        }).then(() => {
          policiesService.searchPolicies({
            familyMember: {firstName: "Eva", lastName: "Smith"}
          }).then(policies => {
            expect(policies.length).toBe(1)
            expect(policies).toContainEqual({
              id: policy.id,
              provider: policy.provider,
              insuranceType: policy.insuranceType,
              status: policy.status,
              startDate: policy.startDate,
              endDate: null,
              createdAt: policy.createdAt,
              familyMembers: null,
              deleted: false,
              customerId: customerId
            })
            done()
          })
        })
      })
    })

    it("Should return policies with match in current customer family members", done => {
      createPolicies(10, customerId)
      createPolicy(customerId).then(policy => {
        policiesService.updatePolicy({
          id: policy.id,
          policy: {
            familyMembers: [{firstName: "Eva", lastName: "Smith"}]
          }
        }).then(() => {
          policiesService.searchPolicies({
            familyMember: {firstName: "Eva", lastName: "Smith"}
          }).then(policies => {
            expect(policies.length).toBe(1)
            expect(policies).toContainEqual({
              id: policy.id,
              provider: policy.provider,
              insuranceType: policy.insuranceType,
              status: policy.status,
              startDate: policy.startDate,
              endDate: null,
              createdAt: policy.createdAt,
              familyMembers: [{firstName: "Eva", lastName: "Smith"}],
              deleted: false,
              customerId: customerId
            })
            done()
          })
        })
      })
    })
  })

  describe("createPolicy", () => {
    it("Should create a new policy", done => {
      const timestamp = now()
      policiesService.createPolicy({
        policy: {
          customerId: customerId,
          status: PolicyStatus.ACTIVE,
          endDate: null,
          startDate: timestamp,
          provider: "google",
          insuranceType: InsuranceType.HEALTH,
          familyMembers: null
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
          customerId: customerId,
          familyMembers: null,
          deleted: false
        })
        done()
      })
    })

    it("Should create a new policy when family members defined", done => {
      const timestamp = now()
      policiesService.createPolicy({
        policy: {
          customerId: customerId,
          status: PolicyStatus.ACTIVE,
          endDate: null,
          startDate: timestamp,
          provider: "google",
          insuranceType: InsuranceType.HEALTH,
          familyMembers: [{
            firstName: "Eva",
            lastName: "Smith"
          }]
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
          customerId: customerId,
          deleted: false,
          familyMembers: [{
            firstName: "Eva",
            lastName: "Smith"
          }]
        })
        done()
      })
    })
  })

  describe("updatePolicy", () => {
    it("Should update policy in the DB and create history entry when policy exists", done => {
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
            insuranceType: InsuranceType.HOUSEHOLD,
            familyMembers: initial.familyMembers,
            deleted: false
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
              policyChangeType: PolicyChangeType.UPDATE,
              familyMembers: initial.familyMembers
            })
            done()
          })
        })
      })
    })

    it("Should update policy in the DB and create history entry when policy exists with family members", done => {
      createPolicy(customerId, [{firstName: "Eva", lastName: "Smith"}]).then(initial => {
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
            insuranceType: InsuranceType.HOUSEHOLD,
            familyMembers: [{firstName: "Eva", lastName: "Smith"}],
            deleted: false
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
              policyChangeType: PolicyChangeType.UPDATE,
              familyMembers: [{firstName: "Eva", lastName: "Smith"}]
            })
            done()
          })
        })
      })
    })

    it("Should throw error when policy doesn't exist", done => {
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

    it("Should remove family members and create history item", done => {
      createPolicy(customerId, [{firstName: "Eva", lastName: "Smith"}]).then(initialPolicy => {
        policiesService.updatePolicy({
          id: initialPolicy.id,
          policy: {
            familyMembers: null
          }
        }).then(updated => {
          expect(updated.familyMembers).toBeNull()
          policiesService.getPolicyHistory({policyId: initialPolicy.id}).then(history => {
            expect(history.length).toBe(1)
            expect(history).toContainEqual({
              id: any(String),
              policyId: initialPolicy.id,
              customerId: customerId,
              endDate: initialPolicy.endDate,
              insuranceType: initialPolicy.insuranceType,
              provider: initialPolicy.provider,
              startDate: initialPolicy.startDate,
              status: initialPolicy.status,
              createdAt: any(Date),
              policyChangeType: PolicyChangeType.UPDATE,
              policyCreatedAt: initialPolicy.createdAt,
              familyMembers: [{firstName: "Eva", lastName: "Smith"}]
            })
            done()
          })
        })
      })
    })

    it("Should add family members and create history item", done => {
      createPolicy(customerId).then(initialPolicy => {
        policiesService.updatePolicy({
          id: initialPolicy.id,
          policy: {
            familyMembers: [{firstName: "Eva", lastName: "Smith"}]
          }
        }).then(updated => {
          expect(updated.familyMembers).toEqual([{firstName: "Eva", lastName: "Smith"}])
          policiesService.getPolicyHistory({policyId: initialPolicy.id}).then(history => {
            expect(history.length).toBe(1)
            expect(history).toContainEqual({
              id: any(String),
              policyId: initialPolicy.id,
              customerId: customerId,
              endDate: initialPolicy.endDate,
              insuranceType: initialPolicy.insuranceType,
              provider: initialPolicy.provider,
              startDate: initialPolicy.startDate,
              status: initialPolicy.status,
              createdAt: any(Date),
              policyChangeType: PolicyChangeType.UPDATE,
              policyCreatedAt: initialPolicy.createdAt,
              familyMembers: null
            })
            done()
          })
        })
      })
    })
  })

  describe("deletePolicy", () => {
    it("Should delete existing policy and create history entry in DB when policy exists", done => {
      createPolicy(customerId).then(initial => {
        policiesService.deletePolicy({
          id: initial.id
        }).then(deleted => {
          expect(deleted.id).toEqual(initial.id)
          getContext().prisma.policy.findMany({
            where: {
              id: initial.id,
              deleted: false
            }
          }).then(dbPolicies => {
            expect(dbPolicies).toEqual([])
            getContext().prisma.policyHistory.findMany({
              where: {
                policyId: initial.id,
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
                policyChangeType: PolicyChangeType.DELETE,
                familyMembers: null
              })
              done()
            })
          })
        })
      })
    })

    it("Should throw error when policy doesn't exist", done => {
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
    it("Should return empty list when no changes exist for policy", done => {
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


    it("Should return histories for changed policies", done => {
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
                policyChangeType: PolicyChangeType.UPDATE,
                familyMembers: null
              })
            })
          done()
        })
      })
    })
  })
})
