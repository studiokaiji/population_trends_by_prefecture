import { usePrefectures } from "@/hooks/usePrefectures";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import styles from "@/components/Prefectures.module.css";

export const Prefectures = () => {
  const { data: prefectures, error: fetchPrefecturesError } = usePrefectures();

  useEffect(() => {
    if (fetchPrefecturesError) {
      alert(fetchPrefecturesError);
    }
  }, [fetchPrefecturesError]);

  return (
    <div className={styles.module}>
      {prefectures?.map((prefecture) => (
        <Checkbox
          key={`prefectures-${prefecture.prefCode}`}
          label={prefecture.prefName}
        />
      ))}
    </div>
  );
};
