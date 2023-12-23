import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Checkbox } from "./Checkbox";
import "@testing-library/jest-dom";

describe("Checkbox", () => {
  it("renders a checkbox input and label", () => {
    render(<Checkbox label="Test Label" />);

    const inputElement = screen.getByRole("checkbox");
    expect(inputElement);

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
  });

  it("applies the passed className to the wrapper div", () => {
    const className = "custom-class";
    render(<Checkbox className={className} />);

    const wrapperDiv = screen.getByRole("checkbox").parentNode;
    expect(wrapperDiv).toHaveClass("checkbox-wrapper", className);
  });

  it("generates a unique id for the checkbox if one is not provided", () => {
    const label = "Test";
    render(<Checkbox label={label} />);

    const inputElement = screen.getByLabelText(label);
    expect(inputElement.id).not.toBe("");
  });
});
