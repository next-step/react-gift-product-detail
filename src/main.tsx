import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/GlobalStyle.tsx';
import theme from './styles/theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './ErrorBoundary';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
          <Suspense fallback={<div>로딩 중...</div>}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
