import {describe, expect} from "@jest/globals"
import {UpdatePolicy} from "../../src/service/policies.service"
import {InsuranceType} from "@prisma/client"
import {objWithoutUndefinedFields} from "../../src/util/util"

describe("objWithoutUndefinedFields", () => {
  it("Should return data without undefined fields", done => {
    const updatePolicy: UpdatePolicy = {
      insuranceType: InsuranceType.LIABILITY,
      status: null,
      endDate: undefined,
      customerId: undefined,
      startDate: undefined,
      provider: undefined
    }

    const policyUpdateInput = objWithoutUndefinedFields(updatePolicy)

    expect(policyUpdateInput).toEqual({
      insuranceType: InsuranceType.LIABILITY,
      status: null
    })
    done()
  })

  it("Should return undefined for undefined input", done => {
    expect(objWithoutUndefinedFields(undefined)).toBeUndefined()
    done()
  })

  it("Should return null for null input", done => {
    expect(objWithoutUndefinedFields(null)).toBeNull()
    done()
  })

  it("Should return array for array input", done => {
    expect(objWithoutUndefinedFields([1, 2, 3])).toEqual([1, 2, 3])
    done()
  })
})
