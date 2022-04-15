import { InsuranceType, PolicyStatus } from "@prisma/client";
import { getMatchingEnumValueByString } from "./utils";

describe("get matching enum value by string", () => {
  test("single match should return single result", () => {
    const result = getMatchingEnumValueByString(InsuranceType, "lia");
    expect(result).toStrictEqual(["LIABILITY"]);
  });

  test("multiple matches should return multiple results", () => {
    const result = getMatchingEnumValueByString(InsuranceType, "e");
    expect(result).toStrictEqual(["HOUSEHOLD", "HEALTH"]);
  });

  test("no match should return undefined", () => {
    const result = getMatchingEnumValueByString(PolicyStatus, "nomatch");
    expect(result).toBeUndefined;
  });
});
