import {describe, expect, test} from "@jest/globals"
import {app, server} from "../../../src"
import request from "supertest"
import {prismaMock} from "../../singleton"
import {InsuranceType, Policy, PolicyStatus} from "@prisma/client"

describe("Test the root endpoint", function () {
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
      .then((response: { statusCode: any }) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

afterAll((done) => {
  server.close(done)
})
