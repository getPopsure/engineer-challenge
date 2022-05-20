import {describe, expect, test} from "@jest/globals"
import request from "supertest"
import {app, server} from "../../../src"

describe("Test the policies endpoint", function () {
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
