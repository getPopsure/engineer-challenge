import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  clientSearchResult,
  providerSearchResult,
  statusSearchResult,
  typeSearchResult,
} from "../../mocks/data";
import Policies from "../Policies";

const user = userEvent.setup();

beforeEach(async () => {
  render(<Policies />);
  await waitForElementToBeRemoved(() => screen.getByText("loading..."));
});

// TODO:
// 1. test initial state: valid list, searchbar, search button, disabled clear exists
// 2. cross field search test
// 3. test clear button enabled when search is applied
// 4. change findbytext to findbyrole

// Show only ACTIVE and PENDING policies
describe("initial render", () => {
  test("should display correct number of results", async () => {
    const items = await screen.findAllByRole("row");
    // given: 10, active & pending: 8;
    expect(items.length).toBe(9); // header row included
  });

  test("should display active policies", async () => {
    const items = await screen.findAllByText("ACTIVE");
    items.map((item) => expect(item).toBeInTheDocument());
  });

  test("should display pending policies", async () => {
    const items = await screen.findAllByText("PENDING");
    items.map((item) => expect(item).toBeInTheDocument());
  });

  test("should not display cacncelled policies", async () => {
    const items = screen.queryAllByAltText("CANCELLED");
    await waitFor(() => expect(items).toEqual([]));
  });

  test("should not display dropped out policies", async () => {
    const items = screen.queryAllByAltText("DROPPED_OUT");
    await waitFor(() => expect(items).toEqual([]));
  });
});

// As a user, I want to be able to search for policies using any of the text fields displayed on the table.
describe("search policies", () => {
  test("should display correct number of results for policies provider search", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "aok");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(providerSearchResult.length + 1); // header row included
  });

  test("should display correct number of results for policies status search", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "acti");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(statusSearchResult.length + 1); // header row included
  });

  test("should display correct number of results for policies type search", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "hea");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(typeSearchResult.length + 1); // header row included
  });

  test("should display correct number of results for policies client name search", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "hay");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(clientSearchResult.length + 1); // header row included
  });

  test("should not display any results if there are no matches", async () => {
    await user.type(screen.getByRole("textbox", { name: "" }), "nomatch");
    await user.click(screen.getByRole("button", { name: "Search" }));
    const items = screen.queryAllByRole("row");
    await waitFor(() => expect(items).toEqual([]));
  });
});

describe("clear search", () => {
  beforeEach(async () => {
    // to enable clear button, filter needs to be applied first
    await user.type(screen.getByRole("textbox", { name: "" }), "aok");
    await user.click(screen.getByRole("button", { name: "Search" }));
    await waitForElementToBeRemoved(() => screen.getByText("loading..."));
  });
  test("should display correct number of results", async () => {
    await user.click(screen.getByRole("button", { name: "Clear" }));
    await waitForElementToBeRemoved(() => screen.getByText("loading..."));
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(9); // header row included
  });
});
