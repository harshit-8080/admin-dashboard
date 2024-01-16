import { it, describe, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import LoginPage from "./login";

describe("Login Page", () => {
  it("should render home page", () => {
    render(<LoginPage />);

    // ^ getBy --> Throw an error if not found
    // ^ queryBy --> returns null if not found
    // ^ findBy --> used for async

    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Remember me" })
    ).toBeInTheDocument();

    expect(screen.getByText("Forgot password")).toBeInTheDocument();
  });
});
