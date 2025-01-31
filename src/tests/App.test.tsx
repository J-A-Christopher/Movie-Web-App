import App from "@/App";
import { store } from "@/state/store/movie_store";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it } from "vitest";

describe("App", () => {
  it("renders the App component", () => {
    render(<Provider store={store}> <App /></Provider>);

    // screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
