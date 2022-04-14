import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Policies from "../Policies";

const mockData = [
  {
    id: "1",
    customer: {
      firstName: "Cyrillus",
      lastName: "Biddlecombe",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "2",
    customer: {
      firstName: "Brandy",
      lastName: "Harbour",
    },
    provider: "BARMER",
    insuranceType: "LIABILITY",
    status: "PENDING",
  },
  {
    id: "3",
    customer: {
      firstName: "Ailina",
      lastName: "Harber",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "DROPPED_OUT",
  },
  {
    id: "4",
    customer: {
      firstName: "Aguste",
      lastName: "Bilsford",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "5",
    customer: {
      firstName: "Haydon",
      lastName: "Ballay",
    },
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "ACTIVE",
  },
  {
    id: "6",
    customer: {
      firstName: "Brandyn",
      lastName: "Argyle",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "CANCELLED",
  },
  {
    id: "7",
    customer: {
      firstName: "Tani",
      lastName: "Erasmus",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
  {
    id: "8",
    customer: {
      firstName: "Galvan",
      lastName: "Suggey",
    },
    provider: "TK",
    insuranceType: "HOUSEHOLD",
    status: "PENDING",
  },
  {
    id: "9",
    customer: {
      firstName: "Rozelle",
      lastName: "Nipper",
    },
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
  {
    id: "10",
    customer: {
      firstName: "Flossie",
      lastName: "Camings",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
];

const providerSearchMockData = [
  {
    id: "4",
    customer: {
      firstName: "Aguste",
      lastName: "Bilsford",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "10",
    customer: {
      firstName: "Flossie",
      lastName: "Camings",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
];

const statusSearchMockData = [
  {
    id: "5",
    customer: {
      firstName: "Haydon",
      lastName: "Ballay",
    },
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "ACTIVE",
  },
  {
    id: "7",
    customer: {
      firstName: "Tani",
      lastName: "Erasmus",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },

  {
    id: "9",
    customer: {
      firstName: "Rozelle",
      lastName: "Nipper",
    },
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
];

const typeSearchMockData = [
  {
    id: "1",
    customer: {
      firstName: "Cyrillus",
      lastName: "Biddlecombe",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "4",
    customer: {
      firstName: "Aguste",
      lastName: "Bilsford",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
  {
    id: "7",
    customer: {
      firstName: "Tani",
      lastName: "Erasmus",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },

  {
    id: "9",
    customer: {
      firstName: "Rozelle",
      lastName: "Nipper",
    },
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
  },
  {
    id: "10",
    customer: {
      firstName: "Flossie",
      lastName: "Camings",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
  },
];

const clientSearchMockData = [
  {
    id: "5",
    customer: {
      firstName: "Haydon",
      lastName: "Ballay",
    },
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "ACTIVE",
  },
];

const handlers = [
  rest.get("http://localhost:4000/policies", (req, res, ctx) => {
    const keyword = req.url.searchParams.get("search");
    switch (keyword) {
      case "aok":
        return res(ctx.status(200), ctx.json(providerSearchMockData));
      case "acti":
        return res(ctx.status(200), ctx.json(statusSearchMockData));
      case "hea":
        return res(ctx.status(200), ctx.json(typeSearchMockData));
      case "hay":
        return res(ctx.status(200), ctx.json(clientSearchMockData));
      default:
        return res(ctx.status(200), ctx.json(mockData));
    }
  }),
];

const user = userEvent.setup();

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

beforeEach(async () => {
  render(<Policies />);
  await waitForElementToBeRemoved(() => screen.getByText("loading..."));
});

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

// TODO:
// 1. test initial state: valid list, searchbar, search button, disabled clear exists
// 2. cross field search test
// 3. test clear button enabled when search is applied
// 4. change findbytext to findbyrole
// 5. move mock data

describe("Show only ACTIVE and PENDING policies", () => {
  test("renders correct number of rows", async () => {
    const items = await screen.findAllByRole("row");
    // given: 10, active & pending: 8;
    expect(items.length).toBe(9); // header row included
  });

  test("renders active policies", async () => {
    const items = await screen.findAllByText("ACTIVE");
    items.map((item) => expect(item).toBeInTheDocument());
  });

  test("renders pending policies", async () => {
    const items = await screen.findAllByText("PENDING");
    items.map((item) => expect(item).toBeInTheDocument());
  });

  test("does not render cacncelled policies", async () => {
    const items = screen.queryAllByAltText("CANCELLED");
    await waitFor(() => expect(items).toEqual([]));
  });

  test("does not render dropped out policies", async () => {
    const items = screen.queryAllByAltText("DROPPED_OUT");
    await waitFor(() => expect(items).toEqual([]));
  });
});

describe("As a user, I want to be able to search for policies using any of the text fields displayed on the table.", () => {
  test("Correct search result should be displayed when search filter for policies provider is applied", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "aok");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(providerSearchMockData.length + 1); // header row included
  });

  test("Correct search result should be displayed when search filter for policies status is applied", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "acti");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(statusSearchMockData.length + 1); // header row included
  });

  test("Correct search result should be displayed when search filter for policies type is applied", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "hea");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(typeSearchMockData.length + 1); // header row included
  });

  test("Correct search result should be displayed when search filter for policies client name is applied", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "hay");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(clientSearchMockData.length + 1); // header row included
  });

  test("Clearing the search should return the table to its original state", async () => {
    // to enable clear button, filter needs to be applied first
    await user.type(screen.getByRole("textbox", { name: "" }), "aok");
    await user.click(screen.getByRole("button", { name: "Search" }));
    await waitForElementToBeRemoved(() => screen.getByText("loading..."));
    await user.click(screen.getByRole("button", { name: "Clear" }));
    await waitForElementToBeRemoved(() => screen.getByText("loading..."));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(9); // header row included
  });

  test("Do not display any results if there are no matches", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "nonexistent");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = screen.queryAllByRole("row");
    await waitFor(() => expect(items).toEqual([]));
  });
});
