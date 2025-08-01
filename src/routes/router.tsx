import { Routes, Route, Navigate } from "react-router";
import { ROUTE_PATH } from "./paths";
import MainPage from "@/pages/main/MainPage";
import LoginPage from "@/pages/login/LoginPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";
import MyPage from "@/pages/my/MyPage";
import OrderPage from "@/pages/order/OrderPage";
import ThemesPage from "@/pages/themes/ThemesPage";
import ProductPage from "@/pages/products/ProductPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATH.HOME} element={<MainPage />} />
      <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTE_PATH.MY_PAGE} element={<MyPage />} />
      <Route path={ROUTE_PATH.ORDER} element={<OrderPage />} />
      <Route path={ROUTE_PATH.THEMES} element={<ThemesPage />} />
      <Route path={ROUTE_PATH.PRODUCT} element={<ProductPage />} />
      <Route path={ROUTE_PATH.NOT_FOUND} element={<NotFoundPage />} />
      <Route
        path="*"
        element={<Navigate to={ROUTE_PATH.NOT_FOUND} replace />}
      />
    </Routes>
  );
};

export default Router;
