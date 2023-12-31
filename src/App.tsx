import { TopBar } from "@/components/TopBar";
import { storagePersister, queryClient } from "@/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Suspense, useState } from "react";
import { Prefectures } from "./components/Prefectures";
import { Loading } from "./components/ui/Loading";
import { ScreenCenter } from "./components/layout/ScreenCenter";
import styles from "@/App.module.css";

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: storagePersister }}
    >
      <nav>
        <TopBar />
      </nav>
      <Suspense
        fallback={
          <ScreenCenter>
            <Loading />
          </ScreenCenter>
        }
      >
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
