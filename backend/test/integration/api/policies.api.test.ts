import {describe, expect} from "@jest/globals"
import {app, server} from "../../../src"
import request, {Response} from "supertest"
import {getContext} from "../../../src/db/prisma.client"
import {InsuranceType, PolicyStatus} from "@prisma/client"
import {randomUUID} from "crypto"
import {cleanupDB, createCustomer, createPolicies, createPolicy} from "../util"
import {any} from "jest-mock-extended"


let customerId: string
beforeAll(done => {
  cleanupDB(getContext()).then(() => done())
})

beforeEach(done => {
  createCustomer().then(id => {
    customerId = id
  }).then(() => done())
})


afterAll(done => {
  getContext().prisma.$disconnect()
  server.close(() => done())
})

afterEach(done => {
  done()
})

describe("Policies API", () => {
  describe("GET /policies", () => {
    it("Should response with policies", done => {
      request(app)
        .get("/policies")
        .then((response: Response) => {
          expect(response.statusCode).toBe(200)
          done()
        })
    })

    it("Should search policies by family members", done => {
      createPolicies(10, customerId)
      createPolicy(customerId, [{firstName: "Eva", lastName: "Smith"}])
        .then(policy => {
          request(app).get("/policies?familyMemberFirstName=Eva&familyMemberLastName=Smith")
            .then((response: Response) => {
              expect(response.statusCode).toBe(200)
              expect(response.body).toBeInstanceOf(Array)
              expect(response.body.length).toBe(1)
              expect(response.body).toContainEqual({
                startDate: policy.startDate.toISOString(),
                endDate: policy.endDate,
                status: policy.status,
                insuranceType: policy.insuranceType,
                customerId: policy.customerId,
                provider: policy.provider,
                createdAt: policy.createdAt.toISOString(),
                id: policy.id,
                deleted: false,
                familyMembers: [{firstName: "Eva", lastName: "Smith"}]
              })
              done()
            })

        })
    })

    it("Should response with 400 when only firstName queried", done => {
      createPolicies(10, customerId)
      createPolicy(customerId, [{firstName: "Eva", lastName: "Smith"}])
        .then(() => {
          request(app).get("/policies?familyMemberFirstName=Eva")
            .then((response: Response) => {
              expect(response.statusCode).toBe(400)
              expect(response.body.error).toEqual("You should either specify both familyMemberFirstName and familyMemberLastName query params or neither of two")
              done()
            })

        })
    })

    it("Should take into account pagination params in GET request", done => {
      createPolicies(10, customerId).then(() => {
        request(app)
          .get("/policies?take=3&skip=3")
          .then((response: Response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBe(3)
            done()
          })
      })
    })
  })

  describe("PUT /policies/:id", () => {
    it("Should response with 200 to the PUT method with family members", done => {
      createPolicy(customerId).then(policy => {
        request(app)
          .put(`/policies/${policy.id}`)
          .send({
            familyMembers: [{firstName: "Eva", lastName: "Smith"}, {firstName: "Martha", lastName: "Smith"}]
          })
          .then((response: Response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual({
              startDate: policy.startDate.toISOString(),
              endDate: policy.endDate,
              status: policy.status,
              insuranceType: policy.insuranceType,
              customerId: policy.customerId,
              provider: policy.provider,
              createdAt: policy.createdAt.toISOString(),
              id: policy.id,
              deleted: false,
              familyMembers: [{firstName: "Eva", lastName: "Smith"}, {firstName: "Martha", lastName: "Smith"}]
            })
            done()
          })
      })
    })
  })

  describe("POST /policies", () => {
    it("Should response with 404 to the POST method when customer does not exist", done => {
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

    it("Should response with 200 to the POST method without family members", done => {
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
            deleted: false,
            status: PolicyStatus.ACTIVE,
            insuranceType: InsuranceType.LIABILITY,
            customerId: customerId,
            provider: "feather",
            createdAt: any(String),
            id: any(String),
            familyMembers: null
          })
          done()
        })
    })

    it("Should response with 200 to the POST method with family members", done => {
      const startDate = new Date()
      request(app)
        .post("/policies")
        .send({
          startDate: startDate,
          endDate: null,
          status: PolicyStatus.ACTIVE,
          insuranceType: InsuranceType.LIABILITY,
          customerId: customerId,
          provider: "feather",
          familyMembers: [{firstName: "Eva", lastName: "Smith"}, {firstName: "Martha", lastName: "Smith"}]
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
            id: any(String),
            deleted: false,
            familyMembers: [{firstName: "Eva", lastName: "Smith"}, {firstName: "Martha", lastName: "Smith"}]
          })
          done()
        })
    })

    it("Should response with 400 to the POST method with missing fields", done => {
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

    it("Should response with 400 to the POST method with invalid fields", done => {
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
})
