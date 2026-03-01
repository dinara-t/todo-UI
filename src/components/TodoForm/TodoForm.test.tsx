import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";
import { vi } from "vitest";

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
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("submits a trimmed title and default categoryId", () => {
    const onSubmit = vi.fn();
    render(
      <TodoForm mode="create" categories={categories} onSubmit={onSubmit} />,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "  Buy milk  " },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Buy milk",
      completed: false,
      categoryId: 10,
    });
  });

  it("submits completed=true when checkbox is checked", () => {
    const onSubmit = vi.fn();
    render(
      <TodoForm mode="create" categories={categories} onSubmit={onSubmit} />,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Task" },
    });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByRole("button", { name: "Create" }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: "Task",
      completed: true,
      categoryId: 10,
    });
  });
});
