import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";

describe("Navbar", () => {
  it("renders app title and navigation links", () => {
    render(
      <MemoryRouter initialEntries={["/todos"]}>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByText("Todos UI")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Todos" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Categories" }),
    ).toBeInTheDocument();
  });

  it("marks Todos link as active when on /todos", () => {
    render(
      <MemoryRouter initialEntries={["/todos"]}>
        <Navbar />
      </MemoryRouter>,
    );
    const todosLink = screen.getByRole("link", { name: "Todos" });
    expect(todosLink.getAttribute("class") || "").toContain("bg-gray-input");
  });

  it("marks Categories link as active when on /categories", () => {
    render(
      <MemoryRouter initialEntries={["/categories"]}>
        <Navbar />
      </MemoryRouter>,
    );
    const categoriesLink = screen.getByRole("link", { name: "Categories" });
    expect(categoriesLink.getAttribute("class") || "").toContain(
      "bg-gray-input",
    );
  });
});
