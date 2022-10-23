import { rest } from "msw";
import policiesFixture from "./policies.json";
const handlers = [
  rest.get(
    `${process.env.REACT_APP_SERVER_BASE_URL}/policies`,
    async (req, res, ctx) => {
      // rest.get("http://localhost:4000/policies", async (req, res, ctx) => {
      const searhParam = req.url.searchParams.get("search");
      const filteredPoliciesFixture = policiesFixture.filter((policy) => {
        const matchSomeField = [
          policy.provider.toLocaleLowerCase(),
          policy.customer.firstName.toLocaleLowerCase(),
          policy.customer.lastName.toLocaleLowerCase(),
        ].some((field) => searhParam.toLocaleLowerCase().includes(field));
        return !searhParam || matchSomeField;
      });
      return res(ctx.json(filteredPoliciesFixture));
    }
  ),
];
export { handlers };
