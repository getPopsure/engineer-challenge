import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
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
  test.todo(
    "When a filter is applied, I want to see the filtered information on the same table."
  );
  test.todo(
    "When a filter is applied, I want to be able to clear the current filter, this action will display the original information."
  );
  test.todo("The results have to be paginated");
});
