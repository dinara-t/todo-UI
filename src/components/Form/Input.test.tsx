import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";
import { vi } from "vitest";

describe("Input", () => {
  it("renders label and input", () => {
    render(<Input label="Title" value="" onChange={() => {}} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows an error message when provided", () => {
    render(
      <Input label="Title" value="" onChange={() => {}} error="Required" />,
    );
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("calls onChange when user types", () => {
    const onChange = vi.fn();
    render(<Input label="Title" value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Hi" } });
    expect(onChange).toHaveBeenCalled();
  });
});
