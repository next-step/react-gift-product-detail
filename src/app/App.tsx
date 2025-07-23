import { ThemeProvider } from '@emotion/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/auth'
import { ToastContainer } from 'react-toastify'
import { GlobalStyles, theme } from '@/shared/styles'
import Router from '@/app/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* emotion 테마 적용 */}
        <ThemeProvider theme={theme}>
          {/* 인증 컨텍스트 적용 */}
          <AuthProvider>
            {/* Global 스타일 적용 */}
            <GlobalStyles />
            {/* 라우터 적용 */}
            <Router />
            {/* 토스트 컨테이너 */}
            <ToastContainer position="top-center" />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
      {/* React Query 개발 도구 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
