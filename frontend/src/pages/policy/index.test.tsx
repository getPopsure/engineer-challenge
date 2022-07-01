import {
  act,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PolicyPage from "./index";

const user = userEvent.setup();

let searchInput: HTMLElement;

beforeEach(async () => {
  render( <PolicyPage />);  
  searchInput = screen.getByTestId("search-field");
})


describe("initial render", () => {
  it("should show the search input", () => {
    expect(searchInput).toBeInTheDocument();
  });
});

describe("Filter results", () => {

    it("should display correct number of results", async () => {
      const items = await screen.findAllByRole("row");
      expect(items.length).toBe(6); 
    });
  
    it("should display active policies", async () => {
      const items = await screen.findAllByRole("cell", { name: "ACTIVE" });
      items.map((item) => expect(item).toBeInTheDocument());
    });
  
    it("should display pending policies", async () => {
      const items = await screen.findAllByRole("cell", { name: "PENDING" });
      items.map((item) => expect(item).toBeInTheDocument());
    });
  
    it("should not display policy with CANCELLED status", async () => {
      const items = screen.queryAllByRole("cell", { name: "CANCELLED" });
      await waitFor(() => expect(items).toEqual([]));
    });
  
    it("should not display policy with DROPPED status", async () => {
      const items = screen.queryAllByRole("cell", { name: "DROPPED_OUT" });
      await waitFor(() => expect(items).toEqual([]));
    });
});

describe('Input value', () => {
  it('updates on change', async () => {
    userEvent.type(searchInput, "al");
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  })

  it("should not display any results if there are no matches", async () => {
    
    await act( async() => user.type(searchInput, "ser"));
    const items = screen.queryAllByRole("row");
    expect(items.length).toBe(0);
  });
})
