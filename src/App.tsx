import "@/App.css";
import { TopBar } from "@/components/TopBar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <nav>
          <TopBar />
        </nav>
        <main></main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
