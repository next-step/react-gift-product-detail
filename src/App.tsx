import { AppWrapper } from '@/styles/App.styles';
import { Routes, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import WithHeaderLayout from '@/Layout/WithHeaderLayout';
import ResetStyles from '@/styles/ResetStyles';
import MainLayout from '@/Layout/MainLayout';
import Login from '@/pages/Login';
import Mypage from '@/pages/Mypage';
import Order from '@/pages/Order/Order';
import NotFound from '@/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, Suspense, lazy } from 'react';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';
import ThemeDetail from '@/pages/ThemeDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Product from '@/pages/ProductDetail/Product';
const Product = lazy(() => import('@/pages/ProductDetail/Product'));
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';

const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useContext(LoginInfoContext);

  function handleBackClick() {
    if (location.pathname !== '/') navigate(-1);
  }

  function HandleLoginClick() {
    if (userInfo.authToken) navigate('/my');
    else navigate('/login');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <ToastContainer autoClose={2000} />
        <ResetStyles />
        <ErrorBoundary>
          <Routes>
            <Route
              element={
                <WithHeaderLayout
                  handleBackClick={handleBackClick}
                  handleLoginClick={HandleLoginClick}
                />
              }
            >
              <Route path="/" element={<MainLayout />} />
              <Route path="/login" element={<Login onLogin={handleBackClick} />} />
              <Route path="/my" element={<Mypage onLogin={handleBackClick} />} />
              <Route path="/order/:orderId" element={<Order />} />
              <Route
                path="/product/:productId"
                element={
                  <Suspense fallback={<LoadingSpinner message="상품 정보를 불러오는 중..." />}>
                    <Product />
                  </Suspense>
                }
              />
              <Route path="/themes/:themeId" element={<ThemeDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </AppWrapper>
    </QueryClientProvider>
  );
}

export default App;
