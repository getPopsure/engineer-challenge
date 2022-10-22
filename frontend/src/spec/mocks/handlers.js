import { rest } from "msw";
import policiesFixture from "./policies.json";
const handlers = [
  rest.get("http://localhost:4000/policies", async (req, res, ctx) => {
    return res(ctx.json(policiesFixture));
  }),
];
export { handlers };
