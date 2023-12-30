import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const createQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
        staleTime: 0,
      },
    },
  });
  const queryWrapper = ({ children }: { children: ReactElement }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  return { queryClient, queryWrapper };
};
