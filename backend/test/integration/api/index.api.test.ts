import {describe, expect} from "@jest/globals"
import {app, server} from "../../../src"
import request, {Response} from "supertest"
import {getContext} from "../../../src/db/prisma.client"

afterAll(done => {
  getContext().prisma.$disconnect()
  server.close(() => done())
})

describe("Index API", () => {
  describe("GET /", () => {
    it("Should response 200", done => {
      request(app)
        .get("/")
        .then((response: Response) => {
          expect(response.statusCode).toBe(200)
          expect(response.text).toContain("Server is up and running")
          done()
        })
    })
  })
})
