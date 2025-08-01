import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import GlobalStyle from "@/styles/GlobalStyle";
import Layout from "@/components/Layout/Layout";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/loginpage/LoginPage";
import NotFoundPage from "@/pages/notfoundpage/NotFoundPage";
import MyPage from "@/pages/mypage/MyPage";
import OrderPage from "@/pages/orderpage/OrderPage";
import PrivateRoute from "@/routes/PrivateRoute";
import ThemeProductsPage from "@/pages/themeproductspage/ThemeProductsPage";
import ProductDetailPage from "@/pages/productdetailpage/ProductDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "@/pages/homepage/HomePage";
import { withSuspense } from "@/hocs/withSuspense";

const SuspendedHomePage = withSuspense(HomePage);
const SuspendedLoginPage = withSuspense(LoginPage);
const SuspendedOrderPage = withSuspense(OrderPage);
const SuspendedThemeProductsPage = withSuspense(ThemeProductsPage);
const SuspendedProductDetailPage = withSuspense(ProductDetailPage);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <NavigationBar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<SuspendedHomePage />} />
          <Route path="/login" element={<SuspendedLoginPage />} />
          <Route
            path="/my"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <PrivateRoute>
                <SuspendedOrderPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/themes/:themeId"
            element={<SuspendedThemeProductsPage />}
          />
          <Route
            path="/product/:productId"
            element={<SuspendedProductDetailPage />}
          />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
