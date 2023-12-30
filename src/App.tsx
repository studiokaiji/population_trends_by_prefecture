import { TopBar } from "@/components/TopBar";
import { storagePersister, queryClient } from "@/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Suspense, useState } from "react";
import { Prefectures } from "./components/Prefectures";
import styles from "@/App.module.css";

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: storagePersister }}
    >
      <Suspense fallback={<div />}>
        <nav>
          <TopBar />
        </nav>
        <div>
          <div>
            <h2 className={styles.section_title}>都道府県一覧</h2>
            <Prefectures
              prefectures={prefectures}
              onChangePrefectures={setPrefectures}
            />
          </div>
        </div>
      </Suspense>
    </PersistQueryClientProvider>
  );
}

export default App;
