import { rest } from "msw";
import {
  clientSearchResult,
  allPolicies,
  providerSearchResult,
  statusSearchResult,
  typeSearchResult,
  providerSearchKeyword,
  statusSearchKeyword,
  typeSearchKeyword,
  clientSearchKeyword,
} from "./data";

export const handlers = [
  rest.get("http://localhost:4000/policies", (req, res, ctx) => {
    const keyword = req.url.searchParams.get("search");
    switch (keyword) {
      case providerSearchKeyword:
        return res(ctx.status(200), ctx.json(providerSearchResult));
      case statusSearchKeyword:
        return res(ctx.status(200), ctx.json(statusSearchResult));
      case typeSearchKeyword:
        return res(ctx.status(200), ctx.json(typeSearchResult));
      case clientSearchKeyword:
        return res(ctx.status(200), ctx.json(clientSearchResult));
      default:
        return res(ctx.status(200), ctx.json(allPolicies));
    }
  }),
];
