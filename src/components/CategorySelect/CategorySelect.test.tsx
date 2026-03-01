import { render, screen, fireEvent } from "@testing-library/react";
import CategorySelect from "./CategorySelect";
import { vi } from "vitest";

describe("CategorySelect", () => {
  const categories = [
    { id: 1, name: "Work" },
    { id: 2, name: "Home" },
  ];

  it("renders category options", () => {
    render(
      <CategorySelect
        categories={categories}
        value={1}
        onChange={() => {}}
        label="Category"
      />,
    );
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("calls onChange with numeric id", () => {
    const onChange = vi.fn();
    render(
      <CategorySelect
        categories={categories}
        value={1}
        onChange={onChange}
        label="Category"
      />,
    );
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("supports 'All categories' when allowAll is true", () => {
    const onChange = vi.fn();
    render(
      <CategorySelect
        categories={categories}
        value={""}
        onChange={onChange}
        allowAll
        label="Category"
      />,
    );
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });
    expect(onChange).toHaveBeenCalledWith("");
  });
});
