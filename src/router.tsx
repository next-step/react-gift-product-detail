import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RequireAuth from './routes/RequireAuth';

import HomePage from './pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import MyPage from './pages/MyPage';
import NotFoundPage from './pages/NotFoundPage';
import OrderPage from './pages/OrderPage';
import ThemeListPage from './pages/ThemeListPage';
import ProductDetailPage from './pages/ProductDetailPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />\
      <Route
        path="/my"
        element={
          <RequireAuth>
            <MyPage />
          </RequireAuth>
        }
      />
      <Route
        path="/order/:id"
        element={
          <RequireAuth>
            <OrderPage />
          </RequireAuth>
        }
      />
      <Route path="/themes/:themeId" element={<ThemeListPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
);
