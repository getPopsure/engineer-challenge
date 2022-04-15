import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { searchKeywordMock } from "../../mocks/data";
import Policies from "../Policies";

const user = userEvent.setup();

let clearButton: HTMLElement;
let searchButton: HTMLElement;
let searchInput: HTMLElement;

const waitForLoading = async () => {
  await waitForElementToBeRemoved(() => screen.getByTitle("Spinner"));
};

beforeEach(async () => {
  render(<Policies />);
  searchInput = screen.getByRole("textbox", { name: "Search" });
  searchButton = screen.getByRole("button", { name: "Search" });
  clearButton = screen.getByRole("button", { name: "Clear" });
  await waitForLoading();
});

describe("initial render", () => {
  test("should display search input", async () => {
    expect(searchInput).toBeInTheDocument();
  });

  test("should display search button", async () => {
    expect(searchButton).toBeInTheDocument();
  });

  test("search button should be disabled", async () => {
    expect(searchButton).toBeDisabled();
  });

  test("should display clear button", async () => {
    expect(clearButton).toBeInTheDocument();
  });

  test("clear button should be disabled", async () => {
    expect(clearButton).toBeDisabled();
  });

  test("should display correct number of results", async () => {
    const items = await screen.findAllByRole("row");
    // given: 10, active & pending: 8;
    expect(items.length).toBe(9); // header row included
  });

  test("should display active policies", async () => {
    const items = await screen.findAllByRole("cell", { name: "ACTIVE" });
    items.map((item) => expect(item).toBeInTheDocument());
  });

  test("should display pending policies", async () => {
    const items = await screen.findAllByRole("cell", { name: "PENDING" });
    items.map((item) => expect(item).toBeInTheDocument());
  });

  test("should not display cacncelled policies", async () => {
    const items = screen.queryAllByRole("cell", { name: "CANCELLED" });
    await waitFor(() => expect(items).toEqual([]));
  });

  test("should not display dropped out policies", async () => {
    const items = screen.queryAllByRole("cell", { name: "DROPPED_OUT" });
    await waitFor(() => expect(items).toEqual([]));
  });
});

describe("apply search filter with texts from each field", () => {
  test("should display correct number of results with provider search", async () => {
    // apply search
    await user.type(searchInput, searchKeywordMock.provider);
    await user.click(searchButton);
    await waitForLoading();

    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(3); // header row included
  });

  test("should display correct number of results with status search", async () => {
    // apply search
    await user.type(searchInput, searchKeywordMock.status);
    await user.click(searchButton);
    await waitForLoading();

    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(4); // header row included
  });

  test("should display correct number of results with type search", async () => {
    // apply search
    await user.type(searchInput, searchKeywordMock.type);
    await user.click(searchButton);
    await waitForLoading();

    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(6); // header row included
  });

  test("should display correct number of results with client name search", async () => {
    // apply search
    await user.type(searchInput, searchKeywordMock.client);
    await user.click(searchButton);
    await waitForLoading();

    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(2); // header row included
  });

  test("should not display any results if there are no matches", async () => {
    // apply search
    await user.type(searchInput, "nomatch");
    await user.click(searchButton);

    const items = screen.queryAllByRole("row");
    await waitFor(() => expect(items).toEqual([]));
  });

  test("should display all matches across fields", async () => {
    // apply search
    await user.type(searchInput, searchKeywordMock.crossField);
    await user.click(searchButton);
    await waitForLoading();

    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(6); // header row included
  });

  test("clear button should be enabled", async () => {
    // apply search
    await user.type(searchInput, "random");
    await user.click(searchButton);
    await waitForLoading();

    expect(clearButton).not.toBeDisabled();
  });
});

describe("clear search filter applied", () => {
  beforeEach(async () => {
    // apply search
    await user.type(searchInput, "random");
    await user.click(searchButton);
    await waitForLoading();

    // apply clear
    await user.click(clearButton);
    await waitForLoading();
  });

  test("should display correct number of results", async () => {
    const items = await screen.findAllByRole("row");
    expect(items.length).toBe(9); // header row included
  });

  test("clear button should be disabled", async () => {
    expect(clearButton).toBeDisabled();
  });

  test("search button should be disabled", async () => {
    expect(searchButton).toBeDisabled();
  });
});
