import { useSuspenseQuery } from "@tanstack/react-query";

export const usePrefectures = () => {
  return useSuspenseQuery({
    queryKey: ["/api/prefectures"],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0]);
      if (!res.ok) {
        throw Error(String(res.status));
      }

      const body = await res.json();
      if (!("result" in body)) {
        throw Error("result does not exist");
      }

      return body.result as PrefecturesResult;
    },
  });
};
