import {describe, expect, test} from "@jest/globals"
import {app, server} from "../../../src"
import request, {Response} from "supertest"
import {getContext} from "../../../src/db/prisma.client"
import {InsuranceType, PolicyStatus} from "@prisma/client"
import {randomUUID} from "crypto"
import {cleanupDB} from "../cleanup.database"
import {CustomerService} from "../../../src/service/customer.service"
import {now} from "../../../src/util/util"
import {PoliciesService} from "../../../src/service/policies.service"
import {any} from "jest-mock-extended"


let customerId: string
let customerService: CustomerService
let policiesService: PoliciesService
beforeAll(done => {
  cleanupDB(getContext()).then(() => done())
  customerService = new CustomerService(getContext())
  policiesService = new PoliciesService(getContext())
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


afterAll(done => {
  getContext().prisma.$disconnect()
  server.close(() => done())
})

afterEach(done => {
  done()
})

describe("Test the policies endpoint", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/policies")
      .then((response: Response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })

  test("It should response with 404 to the POST method when customer does not exist", done => {
    const customerId = randomUUID()
    request(app)
      .post("/policies")
      .send({
        startDate: new Date(),
        endDate: null,
        status: PolicyStatus.ACTIVE,
        insuranceType: InsuranceType.LIABILITY,
        customerId: customerId,
        provider: "feather"
      })
      .then((response: Response) => {
        expect(response.body.error).toEqual("Customer with id " + customerId + " not found")
        expect(response.statusCode).toBe(404)
        done()
      })
  })

  test("It should response with 200 to the POST method with correct body", done => {
    const startDate = new Date()
    request(app)
      .post("/policies")
      .send({
        startDate: startDate,
        endDate: null,
        status: PolicyStatus.ACTIVE,
        insuranceType: InsuranceType.LIABILITY,
        customerId: customerId,
        provider: "feather"
      })
      .then((response: Response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
          startDate: startDate.toISOString(),
          endDate: null,
          status: PolicyStatus.ACTIVE,
          insuranceType: InsuranceType.LIABILITY,
          customerId: customerId,
          provider: "feather",
          createdAt: any(String),
          id: any(String)
        })
        done()
      })
  })

  test("It should response with 400 to the POST method with missing fields", done => {
    request(app)
      .post("/policies")
      .send({
        endDate: new Date()
      })
      .then((response: Response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toEqual("startDate should be a date, but got undefined instead")
        done()
      })
  })

  test("It should response with 400 to the POST method with invalid fields", done => {
    request(app)
      .post("/policies")
      .send({
        startDate: "not-a-date"
      })
      .then((response: Response) => {
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toEqual("startDate should be a date, but got not-a-date instead")
        done()
      })
  })
})
