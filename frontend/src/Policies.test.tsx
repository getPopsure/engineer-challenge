import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Policies from "./Policies";

const handlers = [
  // Handles a GET /policies request
  rest.get("http://localhost:4000/policies", (req, res, ctx) => {
    // return a mocked policy list
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
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
          id: 2,
          customer: {
            firstName: "Brandy",
            lastName: "Harbour",
          },
          provider: "BARMER",
          insuranceType: "LIABILITY",
          status: "PENDING",
          startDate: "2015-01-13T04:52:15Z",
        },
      ])
    );
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
