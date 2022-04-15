import { rest } from "msw";
import { allPolicies, searchKeywordMock, searchResultMock } from "./data";

export const handlers = [
  rest.get("http://localhost:4000/policies", (req, res, ctx) => {
    const keyword = req.url.searchParams.get("search");
    switch (keyword) {
      case searchKeywordMock.provider:
        return res(ctx.status(200), ctx.json(searchResultMock.provider));
      case searchKeywordMock.status:
        return res(ctx.status(200), ctx.json(searchResultMock.status));
      case searchKeywordMock.type:
        return res(ctx.status(200), ctx.json(searchResultMock.type));
      case searchKeywordMock.client:
        return res(ctx.status(200), ctx.json(searchResultMock.client));
      case searchKeywordMock.crossField:
        return res(ctx.status(200), ctx.json(searchResultMock.crossField));
      default:
        return res(ctx.status(200), ctx.json(allPolicies));
    }
  }),
];
