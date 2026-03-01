import { render, screen, fireEvent } from "@testing-library/react";
import TodoFilters from "./TodoFilters";
import { vi } from "vitest";

describe("TodoFilters", () => {
  const categories = [
    { id: 1, name: "Work" },
    { id: 2, name: "Home" },
  ];

  it("calls onChange when category changes", () => {
    const onChange = vi.fn();
    render(
      <TodoFilters
        categories={categories}
        categoryId={""}
        sortBy="createdAt"
        order="DESC"
        onChange={onChange}
      />,
    );

    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "2" } });

    expect(onChange).toHaveBeenCalledWith({
      categoryId: 2,
      sortBy: "createdAt",
      order: "DESC",
    });
  });

  it("calls onChange when sortBy changes", () => {
    const onChange = vi.fn();
    render(
      <TodoFilters
        categories={categories}
        categoryId={1}
        sortBy="createdAt"
        order="DESC"
        onChange={onChange}
      />,
    );

    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[1], { target: { value: "title" } });

    expect(onChange).toHaveBeenCalledWith({
      categoryId: 1,
      sortBy: "title",
      order: "DESC",
    });
  });

  it("calls onChange when order changes", () => {
    const onChange = vi.fn();
    render(
      <TodoFilters
        categories={categories}
        categoryId={1}
        sortBy="createdAt"
        order="DESC"
        onChange={onChange}
      />,
    );

    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[2], { target: { value: "ASC" } });

    expect(onChange).toHaveBeenCalledWith({
      categoryId: 1,
      sortBy: "createdAt",
      order: "ASC",
    });
  });
});
