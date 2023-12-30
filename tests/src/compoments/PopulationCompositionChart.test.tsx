// @vitest-environment jsdom

import { describe, it, expect, vi, Mock } from "vitest";
import { render } from "@testing-library/react";
import { PopulationCompositionChart } from "@/components/PopulationCompositionChart";
import { usePopulationComposition } from "@/hooks/usePopulationComposition";
import { convertPopulationComposition } from "@/tools/convertPopulationComposition";
import "@testing-library/jest-dom";

vi.mock("@/hooks/usePopulationComposition");
vi.mock("@/tools/convertPopulationComposition");

const alertMock = vi.fn();
globalThis.window.alert = alertMock;

globalThis.window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
  }));

const mockData = [
  { year: 2015, 北海道: 1000000, 青森県: 500000 },
  { year: 2020, 北海道: 990000, 青森県: 450000 },
];

const mockPrefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
];

describe("PopulationCompositionChart", () => {
  it("renders correctly when data is present", () => {
    (usePopulationComposition as Mock).mockReturnValue([
      { data: mockPrefectures[0], error: null },
      { data: mockPrefectures[1], error: null },
    ]);

    (convertPopulationComposition as Mock).mockReturnValue(mockData);

    const { container } = render(
      <PopulationCompositionChart
        prefectures={mockPrefectures}
        dataType="population"
      />,
    );

    expect(container.firstChild).toHaveClass("recharts-responsive-container");
  });

  it("If queryResults contains an error, will be display alert", () => {
    // Mock the custom hook to return data with error for the first query
    (usePopulationComposition as Mock).mockReturnValue([
      { data: null, error: "An error occurred" },
      { data: mockPrefectures[1], error: null },
    ]);

    render(
      <PopulationCompositionChart
        prefectures={mockPrefectures}
        dataType="population"
      />,
    );

    // Check that the chart is not rendered
    expect(alertMock).toHaveBeenCalled();
  });

  it("does not render if no data is available", () => {
    // Mock the custom hook to return empty data
    (usePopulationComposition as Mock).mockReturnValue([]);

    const { container } = render(
      <PopulationCompositionChart prefectures={[]} dataType="population" />,
    );

    // Check that the chart is not rendered
    expect(container.firstChild).toBeNull();
  });
});
