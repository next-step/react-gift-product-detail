import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MyPage from '@/pages/MyPage';
import OrderPage from '@/pages/OrderPage';
import ThemeProductPage from '@/pages/ThemeProductPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import { ROUTE_PATH } from '@/constants/routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATH.MY,
    element: <MyPage />,
  },
  {
    path: ROUTE_PATH.ORDER,
    element: <OrderPage />,
  },
  {
    path: ROUTE_PATH.PRODUCT_DETAIL,
    element: <ProductDetailPage />,
  },
  {
    path: ROUTE_PATH.THEME_PRODUCT,
    element: <ThemeProductPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
