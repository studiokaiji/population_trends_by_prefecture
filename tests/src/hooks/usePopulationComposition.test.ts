import { usePopulationComposition } from "@/hooks/usePopulationComposition";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach } from "node:test";
import { MockedFunction, describe, expect, it, vi } from "vitest";
import { createQueryWrapper } from "~/tools/createQueryWrapper";

const fetchMock: MockedFunction<typeof fetch> = vi.fn();
globalThis.fetch = fetchMock;

const prefectures: Prefecture[] = [
  {
    prefCode: 1,
    prefName: "北海道",
  },
  {
    prefCode: 2,
    prefName: "青森県",
  },
];

const result1 = {
  boundaryYear: 2020,
  data: [
    {
      label: "総人口",
      data: [
        {
          year: 1980,
          value: 12817,
        },
        {
          year: 1985,
          value: 12707,
        },
        {
          year: 1990,
          value: 12571,
        },
        {
          year: 1995,
          value: 12602,
        },
        {
          year: 2000,
          value: 12199,
        },
        {
          year: 2005,
          value: 11518,
        },
        {
          year: 2010,
          value: 10888,
        },
        {
          year: 2015,
          value: 10133,
        },
        {
          year: 2020,
          value: 9302,
        },
      ],
    },
    {
      label: "年少人口",
      data: [
        {
          year: 1980,
          value: 2906,
          rate: 22.67,
        },
        {
          year: 1985,
          value: 2769,
          rate: 21.79,
        },
        {
          year: 1990,
          value: 2346,
          rate: 18.66,
        },
        {
          year: 1995,
          value: 2019,
          rate: 16.02,
        },
        {
          year: 2000,
          value: 1728,
          rate: 14.17,
        },
        {
          year: 2005,
          value: 1442,
          rate: 12.52,
        },
        {
          year: 2010,
          value: 1321,
          rate: 12.13,
        },
        {
          year: 2015,
          value: 1144,
          rate: 11.29,
        },
        {
          year: 2020,
          value: 936,
          rate: 10.06,
        },
      ],
    },
    {
      label: "生産年齢人口",
      data: [
        {
          year: 1980,
          value: 8360,
          rate: 65.23,
        },
        {
          year: 1985,
          value: 8236,
          rate: 64.81,
        },
        {
          year: 1990,
          value: 8144,
          rate: 64.78,
        },
        {
          year: 1995,
          value: 8048,
          rate: 63.86,
        },
        {
          year: 2000,
          value: 7595,
          rate: 62.26,
        },
        {
          year: 2005,
          value: 7032,
          rate: 61.05,
        },
        {
          year: 2010,
          value: 6387,
          rate: 58.66,
        },
        {
          year: 2015,
          value: 5538,
          rate: 54.65,
        },
        {
          year: 2020,
          value: 4756,
          rate: 51.13,
        },
      ],
    },
  ],
};

const result2 = {
  boundaryYear: 2020,
  data: [
    {
      label: "総人口",
      data: [
        { year: 1980, value: 12817 },
        { year: 1985, value: 12707 },
        { year: 1990, value: 12571 },
        { year: 1995, value: 12602 },
        { year: 2000, value: 12199 },
        { year: 2005, value: 11518 },
        { year: 2010, value: 10888 },
        { year: 2015, value: 10133 },
        { year: 2020, value: 9302 },
      ],
    },
    {
      label: "年少人口",
      data: [
        { year: 1980, value: 2906, rate: 22.67 },
        { year: 1985, value: 2769, rate: 21.79 },
        { year: 1990, value: 2346, rate: 18.66 },
        { year: 1995, value: 2019, rate: 16.02 },
        { year: 2000, value: 1728, rate: 14.17 },
        { year: 2005, value: 1442, rate: 12.52 },
        { year: 2010, value: 1321, rate: 12.13 },
        { year: 2015, value: 1144, rate: 11.29 },
        { year: 2020, value: 936, rate: 10.06 },
      ],
    },
    {
      label: "生産年齢人口",
      data: [
        { year: 1980, value: 8360, rate: 65.23 },
        { year: 1985, value: 8236, rate: 64.81 },
        { year: 1990, value: 8144, rate: 64.78 },
        { year: 1995, value: 8048, rate: 63.86 },
        { year: 2000, value: 7595, rate: 62.26 },
        { year: 2005, value: 7032, rate: 61.05 },
        { year: 2010, value: 6387, rate: 58.66 },
        { year: 2015, value: 5538, rate: 54.65 },
        { year: 2020, value: 4756, rate: 51.13 },
      ],
    },
  ],
};

const mockFetch = (res1: Response, res2: Response) => {
  fetchMock.mockImplementation((input) => {
    const url = input as string;
    if (url === "/api/population-composition/1") {
      return Promise.resolve(res1);
    } else if (url === "/api/population-composition/2") {
      return Promise.resolve(res2);
    }
    throw Error();
  });
};

describe("usePopulationComposition", () => {
  const { queryWrapper: wrapper } = createQueryWrapper();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetch", async () => {
    mockFetch(
      new Response(JSON.stringify({ message: null, result: result1 })),
      new Response(JSON.stringify({ message: null, result: result2 })),
    );

    const { result } = renderHook(() => usePopulationComposition(prefectures), {
      wrapper,
    });

    await waitFor(() => {
      if (result.current[0].isFetching || result.current[1].isFetching) {
        throw Error("wait");
      }
    });

    expect(result.current[0].data).toEqual(result1);
    expect(result.current[1].data).toEqual(result2);
  });

  it("If one fetch function fails", async () => {
    mockFetch(
      new Response(JSON.stringify({ message: null, result: result1 }), {
        status: 500,
      }),
      new Response(JSON.stringify({ message: null, result: result2 })),
    );

    const { result } = renderHook(() => usePopulationComposition(prefectures), {
      wrapper,
    });

    await waitFor(() => {
      if (!result.current[0].isError || result.current[1].isFetching) {
        throw Error("wait");
      }
    });

    expect(result.current[0].error?.message).toEqual(String(500));
    expect(result.current[1].error).toEqual(null);
  });

  it("result does not exist in body", async () => {
    mockFetch(
      new Response(JSON.stringify({ message: "failed" })),
      new Response(JSON.stringify({ message: "failed" })),
    );

    const { result } = renderHook(() => usePopulationComposition(prefectures), {
      wrapper,
    });

    await waitFor(() => {
      if (result.current[0].isFetching || result.current[1].isFetching) {
        throw Error("wait");
      }
    });

    expect(result.current[0].error?.message).toEqual("result does not exist");
    expect(result.current[1].error?.message).toEqual("result does not exist");
  });
});
