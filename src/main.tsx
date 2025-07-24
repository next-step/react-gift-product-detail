import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@/styles/theme';
import { GlobalStyles } from '@/styles/global';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '@/apis/queryClient';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
