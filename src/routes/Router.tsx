import { createBrowserRouter } from 'react-router-dom'

import GiftPage from '@/features/Gift/pages/GiftPage'
import LoginPage from '@/features/Login/pages/LoginPage'
import NotFoundPage from '@/features/NotFound/pages/NotFoundPage'
import NavLayout from '@/component/Layout/NavLayout'
import MyPage from '@/features/My/pages/MyPage'
import OrderPage from '@/features/Order/pages/OrderPage'
import ThemePage from '@/features/Theme/pages/ThemePage'
import ProductPage from '@/features/Product/pages/ProductPage'
import PrivateRoute from '@/routes/PrivateRoute'

export const ROUTE_PATH = {
  GIFT: '/',
  LOGIN: '/login',
  MY: '/my',
  ORDER: '/order/:productId',
  THEME: '/themes/:themeId',
  PRODUCT: '/product/:productId',
  NOT_FOUND: '*',
}

const Router = createBrowserRouter([
  {
    path: ROUTE_PATH.GIFT,
    element: <NavLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <GiftPage />,
      },
      {
        path: ROUTE_PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTE_PATH.MY,
        element: (
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTE_PATH.ORDER,
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTE_PATH.THEME,
        element: <ThemePage />,
      },
      {
        path: ROUTE_PATH.PRODUCT,
        element: (
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        ),
      },
    ],
  },
])

export default Router
