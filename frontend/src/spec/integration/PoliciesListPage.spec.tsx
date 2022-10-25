import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";

const renderPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity, retry: false },
    },
  });

  return render(
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
  test("Displays a table with the expected number of rows filtering by PENDING and ACTIVE records", async () => {
    await waitForTableToBeLoaded();
    expect(screen.getAllByRole("row").length).toBe(5 + TABLE_HEADER);
  });
  test("When a filter 'by provider'='BARMER' is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableToBeLoaded();
    const searchBox = await screen.findByRole("searchbox", {
      name: "search",
    });
    fireEvent.change(searchBox, { target: { value: "BARMER" } });
    await waitForTableToBeLoaded();
    expect(await screen.findAllByRole("row")).toHaveLength(3 + TABLE_HEADER);
  });
  test("When a filter 'by name'='Cyrillus' is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableToBeLoaded();
    const searchBox = await screen.findByRole("searchbox", {
      name: "search",
    });
    fireEvent.change(searchBox, { target: { value: "Cyrillus" } });
    await waitForTableToBeLoaded();
    expect(await screen.findAllByRole("row")).toHaveLength(1 + TABLE_HEADER);
  });
  test("When a filter 'by policy status'='ACTIVE' is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableToBeLoaded();
    const multipleComboBox = await screen.findByRole("combobox", {
      name: "Search by policy",
    });
    fireEvent.click(multipleComboBox);
    const activeCheck = await screen.findByTestId("ACTIVE-check");
    fireEvent.click(activeCheck);
    await waitForTableToBeLoaded();
    expect(await screen.findAllByRole("row")).toHaveLength(2 + TABLE_HEADER);
  });
  test("When a filter 'by insurance type'='HOUSEHOLD' is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableToBeLoaded();
    const multipleComboBox = await screen.findByRole("combobox", {
      name: "Search by insurance",
    });
    fireEvent.click(multipleComboBox);
    const activeCheck = await screen.findByTestId("HOUSEHOLD-check");
    fireEvent.click(activeCheck);
    await waitForTableToBeLoaded();
    expect(await screen.findAllByRole("row")).toHaveLength(1 + TABLE_HEADER);
  });
  test("When a filter is applied, I want to be able to clear the current filter, this action will display the original information.", async () => {
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
  test.todo("The results have to be paginated");
});
