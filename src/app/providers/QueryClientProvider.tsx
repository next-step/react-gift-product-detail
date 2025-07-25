import { QueryClient, QueryClientProvider as MyQueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <MyQueryClientProvider client={queryClient}>
      {children}
    </MyQueryClientProvider>
  );
};
