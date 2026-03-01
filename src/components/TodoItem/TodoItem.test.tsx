import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { vi } from "vitest";

describe("TodoItem", () => {
  const todo = {
    id: 1,
    title: "Pay bills",
    completed: false,
    category: { id: 10, name: "Home" },
  };

  it("renders todo title and category info", () => {
    render(
      <TodoItem
        todo={todo}
        onToggle={() => {}}
        onEdit={() => {}}
        onArchive={() => {}}
      />,
    );

    expect(screen.getByText("Pay bills")).toBeInTheDocument();
    expect(screen.getByText("Category: Home")).toBeInTheDocument();
    expect(screen.getByText("ID: 1")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox is changed", () => {
    const onToggle = vi.fn();
    render(
      <TodoItem
        todo={todo}
        onToggle={onToggle}
        onEdit={() => {}}
        onArchive={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole("checkbox", { name: "Toggle Pay bills" }));
    expect(onToggle).toHaveBeenCalledWith(todo);
  });

  it("calls onEdit and onArchive from buttons", () => {
    const onEdit = vi.fn();
    const onArchive = vi.fn();
    render(
      <TodoItem
        todo={todo}
        onToggle={() => {}}
        onEdit={onEdit}
        onArchive={onArchive}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Archive" }));

    expect(onEdit).toHaveBeenCalledWith(todo);
    expect(onArchive).toHaveBeenCalledWith(todo);
  });
});
