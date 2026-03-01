import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  const categories = [
    { id: 10, name: "Work" },
    { id: 11, name: "Home" },
  ];

  it("shows validation error for short title", () => {
    const onSubmit = vi.fn();
    render(
      <TodoForm mode="create" categories={categories} onSubmit={onSubmit} />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(
      screen.getByText("Title must be longer than 1 character"),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a trimmed title and default categoryId", () => {
    const onSubmit = vi.fn();
    render(
      <TodoForm mode="create" categories={categories} onSubmit={onSubmit} />,
    );

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "  Buy milk  " },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Buy milk",
      completed: false,
      categoryId: 10,
      dueDate: null,
      urgency: null,
      recurrenceDays: null,
    });
  });

  it("submits completed=true when checkbox is checked", () => {
    const onSubmit = vi.fn();
    render(
      <TodoForm mode="create" categories={categories} onSubmit={onSubmit} />,
    );

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Task" },
    });

    fireEvent.click(screen.getByText("Completed"));

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Task",
      completed: true,
      categoryId: 10,
      dueDate: null,
      urgency: null,
      recurrenceDays: null,
    });
  });
});
