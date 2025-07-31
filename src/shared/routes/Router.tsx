import Layout from '@components/Layout/Layout';
import Login from '@features/Login/Login';
import MyPage from '@features/MyPage/MyPage';
import NotFound from '@features/NotFound/NotFound';
import GlobalStyle from '@styles/GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginGuard from './LoginGuard';
import Home from '@features/Home/Home';
import GiftOrderPage from '@features/GiftOrderPage/GiftOrderPage';
import ThemeProductList from '@features/ThemeProductList/ThemeProductList';
import ProductDetail from '@features/ProductDetail/ProductDetail';
import PageWrapper from '@components/common/PageWrapper';

const Router = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <LoginGuard redirectTo="/my">
                  <Login />
                </LoginGuard>
              }
            />
            <Route
              path="/my"
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PageWrapper>
                  <ProductDetail />
                </PageWrapper>
              }
            />
            <Route
              path="/order/:id"
              element={
                <PrivateRoute>
                  <GiftOrderPage />
                </PrivateRoute>
              }
            />
            <Route path="/theme/:id" element={<ThemeProductList />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
