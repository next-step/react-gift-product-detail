// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProductsPage from '@/pages/ThemeProductsPage';
import ProductDetailPage from '@/pages/productDetailPage';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { BaseLayout } from './components/Layout/BaseLayout';
import { Navigation } from './components/Layout/Navigation';
import HomePage from '@/pages/Home/Page';
import LoginPage from '@/pages/Login/LoginPage';
import OrderPage from '@/pages/Home/OrderPage';
import MyPage from '@/pages/MyPage/MyPage';
import NotFound from '@/pages/NotFound/Page';
import { RequireAuth } from '@/components/RequireAuth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// React Query client 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <BaseLayout header={<Navigation />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='themes/:themeId/products' element={<ThemeProductsPage />} />
          <Route path='products/:productId' element={<ProductDetailPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='order/:id' element={<OrderPage />} />
          <Route
            path='my'
            element={
              <RequireAuth>
                <MyPage />
              </RequireAuth>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BaseLayout>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
