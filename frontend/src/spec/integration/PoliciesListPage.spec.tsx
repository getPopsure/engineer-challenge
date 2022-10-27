import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";

const renderPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity, retry: false },
    },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

beforeEach(() => {
  renderPage();
});
const waitForTableToBeLoaded = async () => {
  expect(await screen.findByTestId("table-body")).toBeInTheDocument();
};
const TABLE_HEADER = 1;
describe("The table renders properly and filters work correctly", () => {
  test("It filters by PENDING and ACTIVE policy status records when loaded", async () => {
    await waitForTableToBeLoaded();
    expect(screen.getAllByRole("row").length).toBe(5 + TABLE_HEADER);
  });
  test("It filters 'by provider' through the text field", async () => {
    await waitForTableToBeLoaded();
    const searchBox = await screen.findByRole("searchbox", {
      name: "search",
    });
    fireEvent.change(searchBox, { target: { value: "MY_PROVIDER" } });
    await waitForTableToBeLoaded();
    expect(await screen.findAllByRole("row")).toHaveLength(1 + TABLE_HEADER);
  });
  test("It filters 'by name' through the text field", async () => {
    await waitForTableToBeLoaded();
    const searchBox = await screen.findByRole("searchbox", {
      name: "search",
    });
    fireEvent.change(searchBox, { target: { value: "MY_CLIENT" } });
    await waitForTableToBeLoaded();
    expect(await screen.findAllByRole("row")).toHaveLength(1 + TABLE_HEADER);
  });
  test("It filters 'by policy status' through the dropdown adding a row to the prefiltered ACTIVE and PENDING rows", async () => {
    await waitForTableToBeLoaded();
    const policyStatusDropdown = await screen.findByRole("combobox", {
      name: "Search by policy",
    });
    fireEvent.click(policyStatusDropdown);
    const droppedOutpolicyOption = await screen.findByTestId(
      "DROPPED_OUT-check"
    );
    fireEvent.click(droppedOutpolicyOption);
    await waitForTableToBeLoaded();
    await screen.findByTestId("table-body");
    expect(
      await screen.findAllByRole("row", {
        name: /DROPPED_OUT/,
      })
    ).toHaveLength(1);
  });
  test("It filters by insurance type through the dropdown", async () => {
    await waitForTableToBeLoaded();
    const insuranceType = await screen.findByRole("combobox", {
      name: "Search by insurance",
    });
    fireEvent.click(insuranceType);
    const insuranceOption = await screen.findByTestId("HOUSEHOLD-check");
    fireEvent.click(insuranceOption);
    await waitForTableToBeLoaded();
    expect(await screen.findAllByRole("row")).toHaveLength(1 + TABLE_HEADER);
  });

  test("It clears the filter through the 'Clear filters' button", async () => {
    await waitForTableToBeLoaded();
    const searchBox = await screen.findByTestId("HOUSEHOLD-check");
    fireEvent.click(searchBox);
    const clearFilterButton = await screen.findByRole("button", {
      name: "Clear filters",
    });
    fireEvent.click(clearFilterButton);
    await waitForTableToBeLoaded();
    expect(screen.getAllByRole("row").length).toBe(5 + TABLE_HEADER);
  });
  test("Do not display any results if there are no matches", async () => {
    await waitForTableToBeLoaded();
    const searchBox = await screen.findByRole("searchbox", {
      name: "search",
    });
    fireEvent.change(searchBox, { target: { value: "XXXXX" } });
    expect(await screen.findByText("No data to be shown")).toBeInTheDocument();
  });
});
