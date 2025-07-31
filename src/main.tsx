import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { reset } from '@src/styles/reset.ts';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from './theme/theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <Global styles={reset} />
      <App />
    </ThemeProvider>
  </QueryClientProvider>



);
