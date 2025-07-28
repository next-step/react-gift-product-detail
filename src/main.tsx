import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { QueryClient, QueryClientProvider, type DefaultOptions } from '@tanstack/react-query';
import { defaultQueryOptions } from '@/constants/queryOptions';

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
