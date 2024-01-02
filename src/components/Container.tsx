import { queryClient, storagePersister } from "@/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { type ReactNode, Suspense } from "react";
import { TopBar } from "./TopBar";
import { ScreenCenter } from "./layout/ScreenCenter";
import { Loading } from "./ui/Loading";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
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
        {children}
      </Suspense>
    </PersistQueryClientProvider>
  );
};
