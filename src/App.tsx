import { ThemeProvider, Global } from "@emotion/react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { resetStyle } from "@/styles/resetStyle";
import theme from "@/styles/theme";
import { PATH } from "@/paths";
import { MainLayout } from "@/components/MainLayout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import MyPage from "@/pages/MyPage";
import NotFoundPage from "@/pages/NotfoundPage";
import OrderPage from "@/pages/OrderPage";
import ThemePage from "@/pages/ThemePage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Loading from "@/components/Loading";

const queryClient = new QueryClient();

const LayoutWrapper = () => (
  <MainLayout>
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
        <Outlet />
      </ErrorBoundary>
    </Suspense>
  </MainLayout>
);

const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    children: [
      { path: PATH.HOME, element: <HomePage /> },
      { path: PATH.LOGIN, element: <LoginPage /> },
      { path: PATH.MY, element: <MyPage /> },
      { path: PATH.ORDER, element: <OrderPage /> },
      { path: PATH.THEME, element: <ThemePage /> },
      { path: PATH.PRODUCT_DETAIL, element: <ProductDetailPage /> },
      { path: PATH.NOTFOUND, element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={resetStyle} />
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
