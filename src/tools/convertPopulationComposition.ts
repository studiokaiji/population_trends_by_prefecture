type ConvertedItem = {
  [prefecture in string]: number;
} & { year: number };

export const convertPopulationComposition = (
  selectedPrefectures: Prefecture[],
  results: PopulationCompositionResult[],
  dataType: string,
) => {
  const perYearMap = new Map<number, Record<string, number>>();

  results.forEach((result, i) => {
    const filtered = result.data.filter(({ label }) => label === dataType);
    if (filtered.length < 1) {
      return [];
    }

    const { data } = filtered[0];

    for (const item of data) {
      if (!perYearMap.has(item.year)) {
        perYearMap.set(item.year, {});
      }
      perYearMap.set(item.year, {
        ...perYearMap.get(item.year),
        [selectedPrefectures[i].prefName]: item.value,
      });
    }
  });

  const converted: ConvertedItem[] = [];

  for (const [year, value] of perYearMap) {
    converted.push({
      year,
      ...value,
    });
  }

  return converted;
};
