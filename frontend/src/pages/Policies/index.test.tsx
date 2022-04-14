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
    startDate: "2017-04-26T05:32:06Z",
    // endDate
    // createdAt
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
    startDate: "2015-01-13T04:52:15Z",
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
    startDate: "2014-07-14T00:54:34Z",
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
    startDate: "2020-07-21T19:40:35Z",
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
    startDate: "2013-03-30T19:27:54Z",
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
    startDate: "2021-01-12T19:24:41Z",
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
    startDate: "2018-05-11T11:56:51Z",
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
    startDate: "2013-01-25T04:14:34Z",
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
    startDate: "2012-09-24T09:55:17Z",
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
    startDate: "2020-05-02T05:53:46Z",
  },
];

const mockDataAok = [
  {
    id: "3",
    customer: {
      firstName: "Ailina",
      lastName: "Harber",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "DROPPED_OUT",
    startDate: "2014-07-14T00:54:34Z",
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
    startDate: "2020-07-21T19:40:35Z",
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
    startDate: "2021-01-12T19:24:41Z",
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
    startDate: "2020-05-02T05:53:46Z",
  },
];

const handlers = [
  rest.get("http://localhost:4000/policies", (req, res, ctx) => {
    const keyword = req.url.searchParams.get("search");
    if (keyword === "aok") {
      return res(ctx.status(200), ctx.json(mockDataAok));
    }
    return res(ctx.status(200), ctx.json(mockData));
  }),
];

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

// test initial state: valid list, searchbar, search button, disabled clear exists

describe("Show only ACTIVE and PENDING policies", () => {
  test("renders correct number of rows", async () => {
    const items = await screen.findAllByRole("row");
    // given: 10, active & pending: 8;
    expect(items.length).toBe(9); // header row included
  });

  test("renders active policies", async () => {
    const items = await screen.findAllByText("ACTIVE"); // TODO: change to role
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
  const user = userEvent.setup();

  test("When a search filter is applied, I want to see the filtered information on the same table.", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "aok");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(3); // header row included
  });
  // test search filter for status
  // test search filter for type
  // test search filter for client

  test("Clearing the search should return the table to its original state", async () => {
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

  // test clear enabled when search is applied
});
