import {describe} from "@jest/globals"
import {parseWhereInput} from "../../src/models/policies"
import {Prisma} from "@prisma/client"

describe("Test the policies endpoint", function () {
  it("Should return correct query for specified input", done => {
    const actualPolicy: Prisma.PolicyWhereInput = parseWhereInput("JohnSmith")
    expect(actualPolicy.OR).toContainEqual({provider: {contains: "JohnSmith", mode: "insensitive"}})
    expect(actualPolicy.OR).toContainEqual({customer: {firstName: {contains: "JohnSmith", mode: "insensitive"}}})
    expect(actualPolicy.OR).toContainEqual({customer: {lastName: {contains: "JohnSmith", mode: "insensitive"}}})
    done()
  })
})
