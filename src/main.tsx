import React from 'react';
import { createRoot } from 'react-dom/client';
import { Global, ThemeProvider } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import { theme } from '@/styles/theme';
import reset from '@/styles/reset';
import { router } from './router';
import { AuthProvider } from './hooks/useAuth';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" autoClose={3000} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
