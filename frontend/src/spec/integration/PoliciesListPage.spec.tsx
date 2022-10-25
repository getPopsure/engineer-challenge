import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
const waitForTableLoad = async () => {
  renderPage();
  await waitFor(() => expect(screen.getAllByRole("row").length).toBe(5 + 1));
};

describe("The table renders properly and filters work correctly", () => {
  test("Displays a table with the expected number of rows filtering by PENDING and ACTIVE records", async () => {
    await waitForTableLoad();
    expect(screen.getAllByRole("row").length).toBe(5 + 1);
  });
  test("When a filter 'by provider'='BARMER' is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableLoad();
    const searchBox = await screen.findByRole("searchbox", {
      name: "search",
    });
    fireEvent.change(searchBox, { target: { value: "BARMER" } });
    expect(await screen.findAllByRole("row")).toHaveLength(3 + 1);
  });
  test("When a filter 'by name'='Cyrillus' is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableLoad();
    const searchBox = await screen.findByRole("searchbox", {
      name: "search",
    });
    fireEvent.change(searchBox, { target: { value: "Cyrillus" } });
    expect(await screen.findAllByRole("row")).toHaveLength(1 + 1);
  });
  test("When a filter 'by policy status'='ACTIVE' is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableLoad();
    const multipleComboBox = await screen.findByRole("combobox", {
      name: "Search by policy",
    });
    fireEvent.click(multipleComboBox);
    const activeCheck = await screen.findByTestId("ACTIVE-check");
    fireEvent.click(activeCheck);
    expect(await screen.findAllByRole("row")).toHaveLength(2 + 1);
  });
  test("When a filter 'by insurance type'='HOUSEHOLD' is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableLoad();
    const multipleComboBox = await screen.findByRole("combobox", {
      name: "Search by insurance",
    });
    fireEvent.click(multipleComboBox);
    const activeCheck = await screen.findByTestId("HOUSEHOLD-check");
    fireEvent.click(activeCheck);
    expect(await screen.findAllByRole("row")).toHaveLength(1 + 1);
  });
  test("When a filter is applied, I want to be able to clear the current filter, this action will display the original information.", async () => {
    await waitForTableLoad();
    const searchBox = await screen.findByTestId("HOUSEHOLD-check");
    fireEvent.click(searchBox);
    const clearFilterButton = await screen.findByRole("button", {
      name: "Clear filters",
    });
    fireEvent.click(clearFilterButton);
    expect(screen.getAllByRole("row").length).toBe(5 + 1);
  });
  test.todo("The results have to be paginated");
});
