import { usePrefectures } from "@/hooks/usePrefectures";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import styles from "@/components/Prefectures.module.css";

type PrefecturesProps = {
  prefectures: Prefecture[];
  onChangePrefectures: (prefectures: Prefecture[]) => void;
};

export const Prefectures = ({
  prefectures: selectedPrefectures,
  onChangePrefectures,
}: PrefecturesProps) => {
  const { data: prefectures, error: fetchPrefecturesError } = usePrefectures();

  useEffect(() => {
    if (fetchPrefecturesError) {
      alert(fetchPrefecturesError);
    }
  }, [fetchPrefecturesError]);

  const selectPrefectureHandler = (prefecture: Prefecture) => {
    const isSelected = selectedPrefectures.some(
      ({ prefCode }) => prefCode === prefecture.prefCode,
    );

    if (isSelected) {
      const filtered = selectedPrefectures.filter(
        ({ prefCode }) => prefCode !== prefecture.prefCode,
      );
      onChangePrefectures(filtered);
    } else {
      onChangePrefectures([...selectedPrefectures, prefecture]);
    }
  };

  return (
    <div className={styles.module}>
      {prefectures?.map((prefecture) => (
        <Checkbox
          key={`prefectures-${prefecture.prefCode}`}
          label={prefecture.prefName}
          onChange={() => selectPrefectureHandler(prefecture)}
          checked={selectedPrefectures.some(
            ({ prefCode }) => prefCode === prefecture.prefCode,
          )}
        />
      ))}
    </div>
  );
};
