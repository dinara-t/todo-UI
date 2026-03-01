import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { vi } from "vitest";

describe("TodoItem", () => {
  const todo = {
    id: 1,
    title: "Pay bills",
    completed: false,
    archived: false,
    dueDate: "2026-03-10",
    urgency: "HIGH",
    recurrenceDays: 7,
    overdue: false,
    category: { id: 10, name: "Home" },
  };

  it("renders todo title and metadata", () => {
    render(
      <TodoItem
        todo={todo}
        onToggle={() => {}}
        onEdit={() => {}}
        onArchive={() => {}}
        onDuplicate={() => {}}
      />,
    );

    expect(screen.getByText("Pay bills")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Due 2026-03-10")).toBeInTheDocument();
    expect(screen.getByText("HIGH")).toBeInTheDocument();
    expect(screen.getByText("Every 7d")).toBeInTheDocument();
  });

  it("calls onDuplicate when Duplicate clicked", () => {
    const onDuplicate = vi.fn();
    render(
      <TodoItem
        todo={todo}
        onToggle={() => {}}
        onEdit={() => {}}
        onArchive={() => {}}
        onDuplicate={onDuplicate}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Duplicate" }));
    expect(onDuplicate).toHaveBeenCalledWith(todo);
  });
});
