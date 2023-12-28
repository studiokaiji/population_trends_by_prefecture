import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import "@testing-library/jest-dom";

describe("Checkbox", () => {
  it("renders a checkbox input and label", () => {
    const { getByRole, getByText } = render(<Checkbox label="Test Label" />);

    const inputElement = getByRole("checkbox");
    expect(inputElement).toBeInTheDocument();

    const labelElement = getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("generates a unique id for the checkbox if one is not provided", () => {
    const label = "Test";
    const { getByLabelText } = render(<Checkbox label={label} />);

    const inputElement = getByLabelText(label);
    expect(inputElement.id).not.toBe("");
  });

  it("handles checked and defaultChecked props", () => {
    const { getByRole } = render(<Checkbox checked onChange={() => {}} />);
    expect(getByRole("checkbox")).toBeChecked();
  });

  it("handle defaultChecked props", () => {
    const { getByRole } = render(<Checkbox defaultChecked />);
    expect(getByRole("checkbox")).toBeChecked();
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Checkbox onChange={handleChange} />);

    fireEvent.click(getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalled();
  });
});
