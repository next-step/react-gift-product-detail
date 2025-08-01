import { BrowserRouter, Routes, Route } from "react-router-dom"
import PresentProvider from "@/context/PresentProvider"
import PresentThemeProvider from "@/context/PresentThemeProvider"
import CardProvider from "@/context/CardProvider"
import { AuthContextProvider } from "@/context/AuthContextProvider"
import ProtectedRoute from "./ProtectedRoute"
import NotFound from "@/pages/NotFound"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "@/Home"
import Login from "@/pages/Login"
import Categories from "@/pages/Categories"
import MyPage from "@/pages/MyPage"
import OrderPage from "@/pages/OrderPage"
import ThemeInfoPage from "@/pages/ThemeInfoPage"
import ProductDetail from "@/pages/ProductDetail"
import ErrorBoundary from "@/components/ErrorBoundary"

export default function Router() {
  return (
    <AuthContextProvider>
      <ToastContainer position="bottom-center" />
      <BrowserRouter>
        <ErrorBoundary>
          <PresentThemeProvider>
            <PresentProvider>
              <CardProvider>
                <Routes>
                  <Route path="/" element={<Home />}>
                    <Route index element={<Categories />} />
                    <Route path="login" element={<Login />} />

                    <Route
                      path="my"
                      element={
                        <ProtectedRoute>
                          <MyPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="order/:productId"
                      element={
                        <ProtectedRoute>
                          <OrderPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route path="theme/:themeId" element={<ThemeInfoPage />} />
                    <Route
                      path="product/:productId"
                      element={<ProductDetail />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </CardProvider>
            </PresentProvider>
          </PresentThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthContextProvider>
  )
}
