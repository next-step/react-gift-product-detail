import { Suspense } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Outlet,
} from 'react-router-dom';
import { MobileLayout } from '@/components/layout';
import { NavigationBar } from '@/components/navigation';
import {
  PrivateRoute,
  ErrorBoundary,
  LoadingSkeleton,
} from '@/components/common';
import {
  HomePage,
  LoginPage,
  MyPage,
  OrderPage,
  NotFoundPage,
  ThemeProductListPage,
  ProductDetailPage,
} from '@/pages';
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_MY,
  ROUTE_ORDER,
  ROUTE_NOT_FOUND,
  ROUTE_THEME_PRODUCTS,
  ROUTE_PRODUCT_DETAIL,
} from '@/constants';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// OrderLayout 컴포넌트 추가
function OrderLayout() {
  const navigate = useNavigate();
  return (
    <>
      <NavigationBar
        title="선물하기"
        showBackButton={true}
        showProfileButton={false}
        onBackClick={() => navigate(ROUTE_HOME)}
      />
      <Outlet />
    </>
  );
}

// ProductDetailLayout 컴포넌트 추가
function ProductDetailLayout() {
  const navigate = useNavigate();
  return (
    <>
      <NavigationBar
        title="선물하기"
        showBackButton={true}
        showProfileButton={false}
        onBackClick={() => navigate(-1)}
      />
      <Outlet />
    </>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationConfig = () => {
    return {
      title: '선물하기',
      showBackButton: true,
      showProfileButton: true,
    };
  };

  const navConfig = getNavigationConfig();

  const handleBackClick = () => {
    navigate(ROUTE_HOME); // 항상 홈으로 이동
  };

  const handleProfileClick = () => {
    navigate(ROUTE_MY);
  };

  return (
    <ErrorBoundary>
      <MobileLayout>
        {!location.pathname.startsWith(ROUTE_ORDER) &&
          !location.pathname.startsWith('/products') && (
            <NavigationBar
              title={navConfig.title}
              showBackButton={navConfig.showBackButton}
              showProfileButton={navConfig.showProfileButton}
              onBackClick={handleBackClick}
              onProfileClick={handleProfileClick}
            />
          )}

        <Suspense fallback={<LoadingSkeleton type="card" />}>
          <Routes>
            <Route path={ROUTE_HOME} element={<HomePage />} />
            <Route path={ROUTE_LOGIN} element={<LoginPage />} />
            <Route
              path={ROUTE_MY}
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              }
            />
            <Route path={ROUTE_ORDER} element={<OrderLayout />}>
              <Route
                path=":productId"
                element={
                  <PrivateRoute>
                    <OrderPage />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route
              path={ROUTE_PRODUCT_DETAIL}
              element={<ProductDetailLayout />}
            >
              <Route index element={<ProductDetailPage />} />
            </Route>
            <Route
              path={ROUTE_THEME_PRODUCTS}
              element={<ThemeProductListPage />}
            />
            <Route path={ROUTE_NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </MobileLayout>
    </ErrorBoundary>
  );
}

export default App;
