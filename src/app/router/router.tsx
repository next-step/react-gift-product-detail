import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import ProtectedRoute from './ProtectedRoute';
import { Home, Login, MyPage, Order, NotFound, Theme, Product } from '@/pages';
import { ROUTES } from '@/shared/config';
import { Suspense } from 'react';
import { Loading } from '@/shared/ui';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: `${ROUTES.THEME}/:themeId`,
        element: <Theme />,
      },
      {
        path: `${ROUTES.PRODUCT}/:productId`,
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Product />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MYPAGE,
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: `${ROUTES.ORDER}/:productId?`,
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
