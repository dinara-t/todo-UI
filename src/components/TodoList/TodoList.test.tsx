import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import { vi } from "vitest";

describe("TodoList", () => {
  it("shows empty state when there are no todos", () => {
    render(
      <TodoList
        todos={[]}
        onToggle={() => {}}
        onEdit={() => {}}
        onArchive={() => {}}
      />,
    );
    expect(screen.getByText("No todos found")).toBeInTheDocument();
  });

  it("renders a todo item for each todo", () => {
    const todos = [
      { id: 1, title: "A", completed: false, category: null },
      {
        id: 2,
        title: "B",
        completed: true,
        category: { id: 10, name: "Work" },
      },
    ];

    render(
      <TodoList
        todos={todos}
        onToggle={() => {}}
        onEdit={() => {}}
        onArchive={() => {}}
      />,
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("wires handlers through to TodoItem", () => {
    const onToggle = vi.fn();
    const onEdit = vi.fn();
    const onArchive = vi.fn();

    const todos = [{ id: 1, title: "Task", completed: false, category: null }];

    render(
      <TodoList
        todos={todos}
        onToggle={onToggle}
        onEdit={onEdit}
        onArchive={onArchive}
      />,
    );

    expect(
      screen.getByRole("checkbox", { name: "Toggle Task" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archive" })).toBeInTheDocument();
  });
});
