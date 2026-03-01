import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import { vi } from "vitest";

describe("Modal", () => {
  it("does not render when open is false", () => {
    render(
      <Modal open={false} title="Create" onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.queryByText("Create")).not.toBeInTheDocument();
  });

  it("renders title and children when open", () => {
    render(
      <Modal open title="Create" onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("closes on Escape key", () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Create" onClose={onClose}>
        Content
      </Modal>,
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
