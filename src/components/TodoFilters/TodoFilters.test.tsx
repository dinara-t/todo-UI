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
        completed="all"
        overdue={false}
        urgency=""
        dueAfter=""
        dueBefore=""
        onChange={onChange}
      />,
    );

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "2" },
    });

    expect(onChange).toHaveBeenCalled();
    const call = onChange.mock.calls[0][0];
    expect(call.categoryId).toBe(2);
  });

  it("calls onChange when overdue toggled", () => {
    const onChange = vi.fn();
    render(
      <TodoFilters
        categories={categories}
        categoryId={""}
        sortBy="createdAt"
        order="DESC"
        completed="all"
        overdue={false}
        urgency=""
        dueAfter=""
        dueBefore=""
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByText("Overdue only"));

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].overdue).toBe(true);
  });
});
