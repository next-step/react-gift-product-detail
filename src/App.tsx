import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import GlobalStyle from "@/styles/GlobalStyle";
import Layout from "@/components/Layout/Layout";
import NavigationBar from "@/components/NavigationBar/NavigationBar";
import CategorySection from "@/pages/homepage/CategorySection/CategorySection";
import AddFriend from "@/pages/homepage/OtherSection/AddFriend";
import Fighting from "@/pages/homepage/OtherSection/Fighting";
import RisingSection from "@/pages/homepage/RisingSection/RisingSection";
import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/loginpage/LoginPage";
import NotFoundPage from "@/pages/notfoundpage/NotFoundPage";
import MyPage from "@/pages/mypage/MyPage";
import OrderPage from "@/pages/orderpage/OrderPage";
import PrivateRoute from "@/routes/PrivateRoute";
import ThemeProductsPage from "@/pages/themeproductspage/ThemeProductsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/common/ErrorFallback";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <NavigationBar />
        <ToastContainer position="top-center" />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddFriend />
                <Suspense fallback={<LoadingSpinner />}>
                  <CategorySection />
                </Suspense>
                <Fighting />
                <RisingSection />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LoginPage />
              </Suspense>
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
            path="/order/:id"
            element={
              <PrivateRoute>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <OrderPage />
                  </Suspense>
                </ErrorBoundary>
              </PrivateRoute>
            }
          />
          <Route
            path="/themes/:themeId"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ThemeProductsPage />
              </Suspense>
            }
          />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
