import "@/App.css";
import { TopBar } from "@/components/TopBar";
import { storagePersister, queryClient } from "@/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: storagePersister }}
    >
      <div>
        <nav>
          <TopBar />
        </nav>
      </div>
    </PersistQueryClientProvider>
  );
}

export default App;
