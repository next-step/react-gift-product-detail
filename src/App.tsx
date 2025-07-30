import { GlobalStyles } from '@/styles/GlobalStyles'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/utils/query'
import { AppRoutes } from '@/routes/AppRoutes'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
