import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PolicyPage from "./index";


const user = userEvent.setup();

let searchInput: HTMLElement;

beforeEach(async () => {
  render( 
  <PolicyPage />
  );  
  searchInput = screen.getByRole("search");
})


describe("initial render", () => {
  test("should show the search input", async () => {
    expect(searchInput).toBeInTheDocument();
  });

});

describe("apply search filter and display the right results", () => {
 
  test("should not display any results if there are no matches", async () => {
    
    await act( async() => user.type(searchInput, "ser"));
    const items = screen.queryAllByRole("row");
    expect(items.length).toBe(0);
  });

  test("should not display any results if there are no matches", async () => {
    
    await act( async() => user.type(searchInput, "al"));
    const items = screen.queryAllByRole("row");
    expect(items.length).toBe(3);
  });

    test("should display correct number of results", async () => {
      const items = await screen.findAllByRole("row");
      expect(items.length).toBe(6); 
    });
  
    test("should display active policies", async () => {
      const items = await screen.findAllByRole("cell", { name: "ACTIVE" });
      items.map((item) => expect(item).toBeInTheDocument());
    });
  
    test("should display pending policies", async () => {
      const items = await screen.findAllByRole("cell", { name: "PENDING" });
      items.map((item) => expect(item).toBeInTheDocument());
    });
  
    test("should not display policy with CANCELLED status", async () => {
      const items = screen.queryAllByRole("cell", { name: "CANCELLED" });
      await waitFor(() => expect(items).toEqual([]));
    });
  
    test("should not display policy with DROPPED status", async () => {
      const items = screen.queryAllByRole("cell", { name: "DROPPED_OUT" });
      await waitFor(() => expect(items).toEqual([]));
    });
});
function waitForDomChange() {
  throw new Error("Function not implemented.");
}

