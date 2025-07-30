import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

import PresentProvider from "@/context/PresentProvider"
import PresentThemeProvider from "@/context/PresentThemeProvider"
import CardProvider from "@/context/CardProvider"
import { AuthContextProvider } from "@/context/AuthContextProvider"

import ProtectedRoute from "./ProtectedRoute"
import Loading from "@/components/PresentTheme/Loading"
import NotFound from "@/pages/NotFound"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Home = lazy(() => import("@/Home"))
const Login = lazy(() => import("@/pages/Login"))
const Categories = lazy(() => import("@/pages/Categories"))
const MyPage = lazy(() => import("@/pages/MyPage"))
const OrderPage = lazy(() => import("@/pages/OrderPage"))
const ThemeInfo = lazy(() => import("@/pages/ThemeInfoPage"))
const ProductDetail = lazy(() => import("@/pages/ProductDetail"))

import { Component, ReactNode } from "react"

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <p style={{ padding: 32 }}>문제가 발생했습니다</p>
    }
    return this.props.children
  }
}

export default function Router() {
  return (
    <AuthContextProvider>
      <ToastContainer position="bottom-center" />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
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

                      <Route path="theme/:themeId" element={<ThemeInfo />} />
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
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </AuthContextProvider>
  )
}
