import {describe, test} from "@jest/globals";
import {CustomerService} from "../../../src/service/customer.service"
import {PoliciesService} from "../../../src/service/policies.service"
import {getContext} from "../../../src/db/prisma.client"
import {cleanupDB} from "../cleanup.database"
import {InsuranceType, PolicyStatus} from "@prisma/client"
import {server} from "../../../src"


let customerService: CustomerService
let policiesService: PoliciesService
let customerId: string

beforeAll(async () => {
  await cleanupDB(getContext())
  customerService = new CustomerService(getContext())
  policiesService = new PoliciesService(getContext())
})

afterEach(done => {
  cleanupDB(getContext()).then(done)
})

afterAll(done => {
  server.close(done)
})

beforeEach(done => {
  customerService.createCustomer({
    firstName: "John",
    lastName: "Smith",
    dateOfBirth: new Date()
  }).then(result => {
    customerId = result.id
  }).then(done)
})

describe("createPolicy", () => {
  test("Should create a new policy", done => {
    const now = new Date()
    policiesService.createPolicy({
      customerId: customerId,
      status: PolicyStatus.ACTIVE,
      endDate: null,
      startDate: now,
      provider: "google",
      insuranceType: InsuranceType.HEALTH
    }).then(result => {
      expect(result).toEqual({
        id: expect.any(String),
        status: PolicyStatus.ACTIVE,
        endDate: null,
        startDate: now,
        createdAt: expect.any(Date),
        provider: "google",
        insuranceType: InsuranceType.HEALTH,
        customerId: customerId
      })
      done()
    })
  })
})
