import {describe, expect, test} from "@jest/globals"
import request, {Response} from "supertest"
import {app, server} from "../../src"

describe("Test the policies endpoint", function () {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response: Response) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe("failll")
        done()
      })
  })
})

afterAll((done) => {
  server.close(done)
})
