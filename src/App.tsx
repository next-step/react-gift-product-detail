import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from '@/contexts/AuthContext'
import AuthGuard from '@/components/AuthGuard'
import PageWrapper from '@/components/PageWrapper'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Suspense, lazy } from 'react'
import { spinnerStyle, loadingContainerStyle } from '@/styles/common'

// Lazy loading
const LoginPage = lazy(() => import('@/pages/login'))
const HomePage = lazy(() => import('@/pages/HomePage'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const MyPage = lazy(() => import('@/pages/MyPage'))
const OrderPage = lazy(() => import('@/pages/OrderPage'))
const ProductPage = lazy(() => import('@/pages/ProductPage'))
const ThemeProductsPage = lazy(() => import('@/pages/ThemeProductsPage'))

// 공통 로딩 컴포넌트
function Loading() {
  return (
    <div
      css={loadingContainerStyle}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div css={spinnerStyle}></div>
      <span style={{ color: '#3498db', fontWeight: 600, fontSize: 18, marginTop: 16 }}>로딩 중입니다...</span>
    </div>
  );
}

// 공통 에러 컴포넌트
function ErrorFallback() {
  return (
    <div className="text-center py-8">
      <h2 className="text-xl font-bold mb-2">문제가 발생했습니다</h2>
      <p className="text-gray-600 mb-4">페이지를 새로고침해 주세요.</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        새로고침
      </button>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<Loading />}>
            <PageWrapper>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/my" element={
                  <AuthGuard>
                    <MyPage />
                  </AuthGuard>
                } />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/order/:productId" element={
                  <AuthGuard>
                    <OrderPage />
                  </AuthGuard>
                } />
                <Route path="/theme/:themeId" element={<ThemeProductsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageWrapper>
          </Suspense>
        </ErrorBoundary>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App