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
        onDuplicate={() => {}}
      />,
    );
    expect(screen.getByText("No todos found")).toBeInTheDocument();
  });

  it("renders a todo item for each todo", () => {
    const todos = [
      {
        id: 1,
        title: "One",
        completed: false,
        archived: false,
        dueDate: null,
        urgency: null,
        recurrenceDays: null,
        overdue: false,
        category: null,
      },
      {
        id: 2,
        title: "Two",
        completed: true,
        archived: false,
        dueDate: null,
        urgency: null,
        recurrenceDays: null,
        overdue: false,
        category: null,
      },
    ];
    render(
      <TodoList
        todos={todos}
        onToggle={vi.fn()}
        onEdit={vi.fn()}
        onArchive={vi.fn()}
        onDuplicate={vi.fn()}
      />,
    );

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});
