import "@/App.css";
import { TopBar } from "@/components/TopBar";
import { storagePersister, queryClient } from "@/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Suspense } from "react";
import { Prefectures } from "./components/Prefectures";

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: storagePersister }}
    >
      <Suspense fallback={<div />}>
        <div>
          <nav>
            <TopBar />
          </nav>
          <div>
            <h2 className="section-title">都道府県一覧</h2>
            <p>選択した都道府県の総人口推移が表示されます(複数選択可)</p>
            <Prefectures />
          </div>
        </div>
      </Suspense>
    </PersistQueryClientProvider>
  );
}

export default App;
