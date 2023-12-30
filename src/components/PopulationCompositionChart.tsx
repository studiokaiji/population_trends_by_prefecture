import { usePopulationComposition } from "@/hooks/usePopulationComposition";
import { convertPopulationComposition } from "@/tools/convertPopulationComposition";
import { useEffect, useMemo } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const colors = [
  "orange",
  "deeppink",
  "seagreen",
  "cornflowerblue",
  "tomato",
  "turquoise",
  "purple",
  "navy",
  "gray",
  "tomato",
  "limegreen",
];

const formatter = (value: number | bigint) =>
  new Intl.NumberFormat("ja-JP", {
    maximumFractionDigits: 0,
    notation: "compact",
  }).format(value);

type PopulationCompositionChartProps = {
  prefectures: Prefecture[];
  dataType: string;
};

export const PopulationCompositionChart = ({
  prefectures,
  dataType,
}: PopulationCompositionChartProps) => {
  const queryResults = usePopulationComposition(prefectures);

  useEffect(() => {
    for (const result of queryResults) {
      if (result.error) {
        alert(result.error);
        break;
      }
    }
  }, [queryResults]);

  const data = useMemo(() => {
    const results: PopulationCompositionResult[] = [];
    for (const result of queryResults) {
      if (result.data) {
        results.push(result.data);
      }
    }

    if (!results || results.length < 1) {
      return null;
    }

    return convertPopulationComposition(prefectures, results, dataType);
  }, [prefectures, queryResults, dataType]);

  if (!data) {
    return <></>;
  }

  return (
    <ResponsiveContainer width="100%" height={450}>
      <LineChart data={data} margin={{ left: -7 }}>
        <CartesianGrid strokeDasharray="2 3" />
        <XAxis dataKey="year" tick={{ fontSize: "0.8rem" }} />
        <YAxis tick={{ fontSize: "0.8rem" }} tickFormatter={formatter} />
        {prefectures.map((prefecture) => {
          return (
            <Line
              key={prefecture.prefCode}
              dataKey={prefecture.prefName}
              type="monotone"
              stroke={colors[(prefecture.prefCode % colors.length) - 1]}
              strokeWidth={2}
              label={prefecture.prefName}
            />
          );
        })}
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
