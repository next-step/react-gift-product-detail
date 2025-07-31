import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { QueryClient, QueryClientProvider, type DefaultOptions } from '@tanstack/react-query';

const defaultQueryOptions = {
  queries: {
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
    suspense: true,
    useErrorBoundary: true,
  },
};

const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions as DefaultOptions,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
