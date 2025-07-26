import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalResetStyle } from "./styles/reset";
import { Global, ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme/theme";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";
import GiftMain from "./pages/GiftMain";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import OrderPage from "./pages/OrderPage";
import ThemeProduct from "./pages/ThemeProduct";
import ProductDetail from "./pages/ProductDetail";

import { PATH } from "@/constants/path";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncBoundary from "@/components/common/AsyncBoundary";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Global styles={GlobalResetStyle} />
          <AsyncBoundary>
            <AuthProvider>
              <Routes>
                <Route path={PATH.HOME} element={<GiftMain />} />
                <Route path={PATH.LOGIN} element={<Login />} />
                <Route
                  path={PATH.MY_PAGE}
                  element={
                    <RequireAuth>
                      <MyPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path={PATH.ORDER()}
                  element={
                    <RequireAuth>
                      <OrderPage />
                    </RequireAuth>
                  }
                />
                <Route path={PATH.THEME()} element={<ThemeProduct />} />
                <Route path={PATH.NOT_FOUND} element={<NotFound />} />
                <Route path={PATH.ALL} element={<NotFound />} />
                <Route path={PATH.PRODUCT()} element={<ProductDetail />} />

              </Routes>
            </AuthProvider>
          </AsyncBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
