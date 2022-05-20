import {describe, expect, test} from "@jest/globals"
import {app, server} from "../../../src"
import request from "supertest"

describe("Test the root endpoint", function () {
  test("It should response the GET method", done => {
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
