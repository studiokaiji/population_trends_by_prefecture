import { useState } from "react";
import { Prefectures } from "./components/Prefectures";
import { PopulationCompositionChart } from "./components/PopulationCompositionChart";
import { Select } from "./components/ui/Select";
import { DATA_TYPES } from "./consts";
import styles from "@/App.module.css";
import { Container } from "./components/Container";

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [dataType, setDataType] = useState<string>(DATA_TYPES[0]);

  return (
    <Container>
      <main className={styles.wrapper}>
        <div className={styles.prefectures_wrapper}>
          <h2 className={styles.section_title}>都道府県一覧</h2>
          <Prefectures
            prefectures={prefectures}
            onChangePrefectures={setPrefectures}
          />
        </div>
        <Select
          options={DATA_TYPES.map((type) => ({
            value: type,
          }))}
          onSelect={setDataType}
        />
        <PopulationCompositionChart
          prefectures={prefectures}
          dataType={dataType}
        />
      </main>
    </Container>
  );
}

export default App;
