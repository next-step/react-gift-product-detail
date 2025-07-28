import { QueryClient, QueryClientProvider as MyQueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, 
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <MyQueryClientProvider client={queryClient}>
      {children}
    </MyQueryClientProvider>
  );
};
