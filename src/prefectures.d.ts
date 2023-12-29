type Prefecture = { prefCode: number; prefName: string };
type PrefecturesResult = Prefecture[];

type PopulationCompositionDataItem = {
  year: number;
  value: number;
  rate?: number;
};
type PopulationCompositionData = {
  label: string;
  data: PopulationCompositionDataItem[];
};
type PopulationCompositionResult = {
  boundaryYear: number;
  data: PopulationCompositionData[];
};
