import { rest } from "msw";
import policiesFixture from "./policies.json";
// creates an array for a request param that can be a single value or an array
const createArrayFromParam = (myparam) => {
  return myparam ? (Array.isArray(myparam) ? myparam : [myparam]) : [];
};
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
      const requiredPolicyStatuses = createArrayFromParam(policyStatusesParam);
      const matchSomePolicyStatus =
        !requiredPolicyStatuses.length ||
        requiredPolicyStatuses.some((status) => policy.status === status);
      const requiredInsuranceTypes = createArrayFromParam(insuranceTypesParam);
      const matchSomeInsuranceTypes =
        !requiredInsuranceTypes.length ||
        requiredInsuranceTypes.some((type) => policy.insuranceType === type);

      return (
        matchSomeTextField && matchSomePolicyStatus && matchSomeInsuranceTypes
      );
    });
    return res(ctx.json(filteredPoliciesFixture));
  }),
];
export { handlers };
