import {describe, expect, test} from "@jest/globals"
import {app, server} from "../../src"
import request, {Response} from "supertest"

describe("Test the policies endpoint", function () {
  test("It should response the GET method", done => {
    request(app)
      .get("/policies")
      .then((response: Response) => {
        expect(response.statusCode).toBe(200)
        done()
      })
  })
})

afterAll((done) => {
  server.close(done)
})
