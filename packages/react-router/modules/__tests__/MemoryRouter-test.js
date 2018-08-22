import React, { render } from "rax";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import MemoryRouter from "../MemoryRouter";

describe("A <MemoryRouter>", () => {
  it("puts history on context.router", () => {
    let history;
    const ContextChecker = (props, context) => {
      history = context.router.history;
      return null;
    };

    ContextChecker.contextTypes = {
      router: PropTypes.object.isRequired
    };

    const node = document.createElement("div");

    render(
      <MemoryRouter>
        <ContextChecker />
      </MemoryRouter>,
      node
    );

    expect(typeof history).toBe("object");
  });

  it("warns when passed a history prop", () => {
    const history = {};
    const node = document.createElement("div");

    spyOn(console, "error");

    render(<MemoryRouter history={history} />, node);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("<MemoryRouter> ignores the history prop")
    );
  });
});
