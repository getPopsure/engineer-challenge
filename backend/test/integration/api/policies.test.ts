import {describe, expect, test} from "@jest/globals"
import {InsuranceType, Policy, PolicyStatus} from "@prisma/client"
import request from "supertest"
import {app, server} from "../../../src"
import {prismaMock} from "../../singleton"

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
      .then((response: { statusCode: any }) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

afterAll((done) => {
  server.close(done)
})
