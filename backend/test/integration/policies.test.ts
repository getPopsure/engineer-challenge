import {describe, expect, test} from "@jest/globals"
import {InsuranceType, Policy, PolicyStatus} from "@prisma/client"
import request, {Response} from "supertest"
import {app, server} from "../../src"
import {prismaMock} from "../singleton"
import {mockReset} from "jest-mock-extended"

beforeEach(() => {
  mockReset(prismaMock)
})


describe("Test the policies endpoint", function () {
  test("It should response the GET method", done => {
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

    prismaMock.policy.create.mockResolvedValue(policy)

    request(app)
      .get("/")
      .then((response: Response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(JSON.stringify(policy))
        done()
      })
  })
})

afterAll((done) => {
  server.close(done)
})
