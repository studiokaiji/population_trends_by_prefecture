import { describe, it, expect, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Select } from "@/components/ui/Select";
import "@testing-library/jest-dom";

const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

describe("Select", () => {
  it("renders select", () => {
    const { getByRole } = render(
      <Select options={options} onSelect={() => null} />,
    );

    const selectElement = getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });

  it("handle selection", () => {
    const handleSelect = vi.fn();

    const { getByRole } = render(
      <Select options={options} onSelect={handleSelect} />,
    );

    const selectElement = getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "2" } });
    expect(handleSelect).toHaveBeenCalledWith("2");
  });

  it("If there is no label, value will be displayed", () => {
    const options = [{ value: "1" }];
    const { getByText } = render(
      <Select options={options} onSelect={() => null} />,
    );
    const optionElement = getByText(options[0].value);
    expect(optionElement).toBeInTheDocument();
  });
});
