import { type QueryFunction, useQueries } from "@tanstack/react-query";

const fetchPopulationComposition: QueryFunction<
  PopulationCompositionResult,
  [string, number]
> = async ({ queryKey }) => {
  const [path, prefCode] = queryKey;

  const res = await fetch(`${path}/${prefCode}`);
  if (!res.ok) {
    throw Error(String(res.status));
  }

  const body = await res.json();
  if (!("result" in body)) {
    throw Error("result does not exist");
  }

  return body.result as PopulationCompositionResult;
};

export const usePopulationComposition = (prefectures: Prefecture[]) => {
  return useQueries({
    queries: prefectures.map(({ prefCode }) => ({
      queryKey: ["/api/population-composition", prefCode] as [string, number],
      queryFn: fetchPopulationComposition,
    })),
  });
};
