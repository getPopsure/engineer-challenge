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

describe("table", () => {
  test("Displays a table with the expected number of rows", async () => {
    await waitForTableLoad();
    expect(screen.getAllByRole("row").length).toBe(5 + 1);
  });
  test("When a filter by provider is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableLoad();
    const searchBox = await screen.findByRole("searchbox", {
      name: "search",
    });
    fireEvent.change(searchBox, { target: { value: "BARMER" } });
    expect(await screen.findAllByRole("row")).toHaveLength(3 + 1);
  });
  test("When a filter by name is applied, I want to see the filtered information on the same table.", async () => {
    await waitForTableLoad();
    const searchBox = await screen.findByRole("searchbox", {
      name: "search",
    });
    fireEvent.change(searchBox, { target: { value: "Cyrillus" } });
    expect(await screen.findAllByRole("row")).toHaveLength(1 + 1);
  });
  test.todo(
    "When a filter is applied, I want to be able to clear the current filter, this action will display the original information."
  );
  test.todo("The results have to be paginated");
});
