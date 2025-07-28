import { PrivateRoute, PublicRoute } from "@/components/auth";
import { LoadingSpinner } from "@/components/common";
import { Header } from "@/components/main";
import { ROUTE_PATH } from "@/constants";
import {
  LoginPage,
  MainPage,
  MyPage,
  NotFoundPage,
  OrderPage,
  ProductDetailPage,
  ThemeProductPage,
} from "@/pages";
import { Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTE_PATH.HOME} element={<MainPage />} />
          <Route path={ROUTE_PATH.THEME} element={<ThemeProductPage />} />
          <Route element={<PublicRoute />}>
            <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path={ROUTE_PATH.MY} element={<MyPage />} />
            <Route
              path={ROUTE_PATH.PRODUCT}
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ProductDetailPage />
                </Suspense>
              }
            />
            <Route path={ROUTE_PATH.ORDER} element={<OrderPage />} />
          </Route>
          <Route path={ROUTE_PATH.ERROR} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
