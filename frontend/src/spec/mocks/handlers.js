import { rest } from "msw";
import policiesFixture from "./policies.json";
const handlers = [
  rest.get("/policies", async (req, res, ctx) => {
    const searchTextParam = req.url.searchParams.get("searchText");
    const policyStatusesParam = req.url.searchParams.getAll("policyStatuses");
    const insuranceTypesParam = req.url.searchParams.getAll("insuranceTypes");
    let filteredPoliciesFixture = policiesFixture.filter((policy) => {
      if (!searchTextParam && !policyStatusesParam && !insuranceTypesParam)
        return true;
      const matchSomeTextField = [
        policy.provider.toLocaleLowerCase(),
        policy.customer.firstName.toLocaleLowerCase(),
        policy.customer.lastName.toLocaleLowerCase(),
      ].some(
        (field) =>
          !searchTextParam ||
          searchTextParam.toLocaleLowerCase().includes(field)
      );
      const matchSomePolicyStatus =
        !policyStatusesParam.length ||
        policyStatusesParam.some((status) => policy.status === status);
      const matchSomeInsuranceTypes =
        !insuranceTypesParam.length ||
        insuranceTypesParam.some((type) => policy.insuranceType === type);

      return (
        matchSomeTextField && matchSomePolicyStatus && matchSomeInsuranceTypes
      );
    });
    return res(ctx.json(filteredPoliciesFixture));
  }),
];
export { handlers };
