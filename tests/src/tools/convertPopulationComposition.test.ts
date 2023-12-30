import { it, expect, describe } from "vitest";
import {
  type ConvertedItem,
  convertPopulationComposition,
} from "@/tools/convertPopulationComposition";

const selectedPrefectures: Prefecture[] = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
];

const results: PopulationCompositionResult[] = [
  {
    boundaryYear: 2020,
    data: [
      {
        label: "総人口",
        data: [
          { year: 2015, value: 1000000 },
          { year: 2020, value: 990000 },
        ],
      },
      {
        label: "生産年齢人口",
        data: [
          { year: 2015, value: 600000, rate: 54.65 },
          { year: 2020, value: 550000, rate: 51.13 },
        ],
      },
    ],
  },
  {
    boundaryYear: 2020,
    data: [
      {
        label: "総人口",
        data: [
          { year: 2015, value: 500000 },
          { year: 2020, value: 450000 },
        ],
      },
      {
        label: "生産年齢人口",
        data: [
          { year: 2015, value: 300000, rate: 54.65 },
          { year: 2020, value: 250000, rate: 51.13 },
        ],
      },
    ],
  },
];

describe("convertPopulationComposition", () => {
  it("Should convert population composition correctly for given data", () => {
    const totalExpected: ConvertedItem[] = [
      { year: 2015, 北海道: 1000000, 青森県: 500000 },
      { year: 2020, 北海道: 990000, 青森県: 450000 },
    ];

    const totalDataType = "総人口";
    const totalConverted = convertPopulationComposition(
      selectedPrefectures,
      results,
      totalDataType,
    );

    expect(totalConverted).toEqual(totalExpected);

    const workingExpected: ConvertedItem[] = [
      { year: 2015, 北海道: 600000, 青森県: 300000 },
      { year: 2020, 北海道: 550000, 青森県: 250000 },
    ];

    const workingDataType = "生産年齢人口";
    const workingConverted = convertPopulationComposition(
      selectedPrefectures,
      results,
      workingDataType,
    );

    expect(workingConverted).toEqual(workingExpected);
  });

  it("If there is no matching dataType, an empty array is returned", () => {
    const converted = convertPopulationComposition(
      selectedPrefectures,
      results,
      "INVALID_DATA_TYPE",
    );

    expect(converted).toEqual([]);
  });
});
