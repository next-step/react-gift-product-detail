import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/contexts/AuthContext';
import AuthGuard from '@/components/AuthGuard';
import PageWrapper from '@/components/PageWrapper';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Suspense } from 'react';
import Loading from '@/components/Common/Loading';

import LoginPage from '@/pages/login';
import HomePage from '@/pages/HomePage';
import NotFound from '@/pages/NotFound';
import MyPage from '@/pages/MyPage';
import OrderPage from '@/pages/OrderPage';
import ProductPage from '@/pages/ProductPage';
import ThemeProductsPage from '@/pages/ThemeProductsPage';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <PageWrapper>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                <HomePage />
              } />
              <Route path="/my" element={
                <AuthGuard>
                  <MyPage />
                </AuthGuard>
              } />
              <Route path="/product/:productId" element={
                <Suspense fallback={<Loading />}>
                  <ProductPage />
                </Suspense>
              } />
              <Route path="/order/:productId" element={
                <AuthGuard>
                  <Suspense fallback={<Loading />}>
                    <OrderPage />
                  </Suspense>
                </AuthGuard>
              } />
              <Route path="/theme/:themeId" element={
                <ThemeProductsPage />
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageWrapper>
        </ErrorBoundary>

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
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App