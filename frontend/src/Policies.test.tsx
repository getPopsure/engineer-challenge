import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Policies from "./Policies";

// taken from seed.ts
const mockData = [
  {
    customer: {
      firstName: "Cyrillus",
      lastName: "Biddlecombe",
    },
    provider: "BARMER",
    insuranceType: "HEALTH",
    status: "PENDING",
    startDate: "2017-04-26T05:32:06Z",
  },
  {
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
    customer: {
      firstName: "Flossie",
      lastName: "Camings",
    },
    provider: "AOK",
    insuranceType: "HEALTH",
    status: "PENDING",
    startDate: "2020-05-02T05:53:46Z",
  },
  {
    customer: {
      firstName: "Derril",
      lastName: "Gildersleeve",
    },
    provider: "BARMER",
    insuranceType: "HOUSEHOLD",
    status: "PENDING",
    startDate: "2022-01-12T17:47:41Z",
  },
  {
    customer: {
      firstName: "Amanda",
      lastName: "McPherson",
    },
    provider: "TK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
    startDate: "2012-07-04T15:31:29Z",
  },
  {
    customer: {
      firstName: "Garnette",
      lastName: "Benda",
    },
    provider: "TK",
    insuranceType: "HEALTH",
    status: "PENDING",
    startDate: "2012-08-01T03:25:59Z",
  },
  {
    customer: {
      firstName: "Yoko",
      lastName: "Becker",
    },
    provider: "DAK",
    insuranceType: "LIABILITY",
    status: "DROPPED_OUT",
    startDate: "2014-02-22T06:02:58Z",
  },
  {
    customer: {
      firstName: "Sam",
      lastName: "Penni",
    },
    provider: "BARMER",
    insuranceType: "LIABILITY",
    status: "ACTIVE",
    startDate: "2014-04-14T12:39:02Z",
  },
  {
    customer: {
      firstName: "Jeffie",
      lastName: "Pinyon",
    },
    provider: "TK",
    insuranceType: "HOUSEHOLD",
    status: "DROPPED_OUT",
    startDate: "2017-05-28T11:56:27Z",
  },
  {
    customer: {
      firstName: "Mariette",
      lastName: "Cristofanini",
    },
    provider: "AOK",
    insuranceType: "HOUSEHOLD",
    status: "CANCELLED",
    startDate: "2012-03-29T01:59:13Z",
  },
  {
    customer: {
      firstName: "Jess",
      lastName: "Whittle",
    },
    provider: "DAK",
    insuranceType: "LIABILITY",
    status: "PENDING",
    startDate: "2013-11-15T09:58:45Z",
  },
  {
    customer: {
      firstName: "Graeme",
      lastName: "Ternent",
    },
    provider: "DAK",
    insuranceType: "HEALTH",
    status: "ACTIVE",
    startDate: "2020-08-16T03:24:30Z",
  },
  {
    customer: {
      firstName: "Valeria",
      lastName: "Keysel",
    },
    provider: "AOK",
    insuranceType: "LIABILITY",
    status: "ACTIVE",
    startDate: "2016-04-14T02:53:58Z",
  },
];
// assign unique id to each item
const mockDataWithId = mockData.map((item, idx) => ({ ...item, id: idx + 1 }));

const handlers = [
  // Handles a GET /policies request
  rest.get("http://localhost:4000/policies", (req, res, ctx) => {
    // return a mocked policy list
    return res(ctx.status(200), ctx.json(mockDataWithId));
  }),
];

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

test("renders pending policies", async () => {
  render(<Policies />);
  const items = await screen.findByText("Status");
  expect(items).toBeVisible();
  // const linkElement = screen.getByText("PENDING");
  // expect(linkElement).toBeInTheDocument();
});

// 1. mock API
// 2. Get tbody > td with className or any identifier of Badge component (const container = document.querySelector('#app'))
// 3. get text, assert either PENDING or ACTIVE

// test("renders active policies", () => {
//   render(<App />);
//   const linkElement = screen.getByText("ACTIVE");
//   expect(linkElement).toBeInTheDocument();
// });

// test("does not render cancelled policies", () => {
//   render(<App />);
//   const linkElement = screen.getByText("CANCELLED");
//   expect(linkElement).toBeNull();
// });

// test("does not render dropped out policies", () => {
//   render(<App />);
//   const linkElement = screen.getByText("DROPPED_OUT");
//   expect(linkElement).toBeNull();
// });
