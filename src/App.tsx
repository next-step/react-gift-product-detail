import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
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

// URL 파라미터 래퍼 컴포넌트
function ProductDetailWrapper() {
  const { productId } = useParams<{ productId: string }>();
  if (!productId) return <div>잘못된 접근입니다.</div>;
  return <ProductDetailPage productId={productId} />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <BaseLayout header={<Navigation />}>
        {/* React Router 이미 최상위 index.tsx에서 설정되어 있어야 합니다 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="themes/:themeId/products" element={<ThemeProductsPage />} />
          <Route path="products/:productId" element={<ProductDetailWrapper />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="order/:id" element={<OrderPage />} />
          <Route
            path="my"
            element={
              <RequireAuth>
                <MyPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BaseLayout>
      {/* 전역 Toast */}
      <ToastContainer
        position="top-right"
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