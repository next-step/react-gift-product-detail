import LoginPage from '@/page/Login';
import MyPage from '@/page/My';
import OrderPage from '@/page/Order';
import NotFound from '@/page/NotFound';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import HOME from '@/page/Home';
import ThemesPage from '@/page/Themes';
import { ROUTE_PATH } from './routePath';
import ProductPage from '@/page/Product';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATH.HOME} element={<HOME />} />
      <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTE_PATH.MY}
        element={
          <RequireAuth>
            <MyPage />
          </RequireAuth>
        }
      />
      <Route
        path={ROUTE_PATH.ORDER}
        element={
          <RequireAuth>
            <Suspense fallback={<Loading />}>
              <OrderPage />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route path={ROUTE_PATH.PRODUCT} element={<ProductPage />} />
      <Route path={ROUTE_PATH.THEMES} element={<ThemesPage />} />
      <Route path={ROUTE_PATH.NOTFOUND} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
