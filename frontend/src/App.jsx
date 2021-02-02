import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "./AppRoutes";
import "./App.css";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
