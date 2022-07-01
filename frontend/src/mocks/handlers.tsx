import { rest } from "msw";

import { filterResultMock, PoliciesMock } from './mocks';

const mockedFilter = "hay"
const mockedStatus = "ACTIVE"

export const handlers = [
    rest.get("http://localhost:4000/policies", (req: { url: { searchParams: { get: (arg0: string) => any; }; }; }, res: (arg0: any, arg1: any) => any, ctx: { status: (arg0: number) => any; json: (arg0: any) => any; }) => {
    const keyword = req.url.searchParams.get("search");
    switch (keyword) {
      case mockedFilter:
        return res(ctx.status(200), ctx.json(filterResultMock.client));
      case mockedStatus:
        return res(ctx.status(200), ctx.json(filterResultMock.status));
      default:
        return res(ctx.status(200), ctx.json(PoliciesMock));
    }
  }),
]