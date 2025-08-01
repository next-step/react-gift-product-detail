import { render, screen, fireEvent } from '@testing-library/react'
import { LoginPage } from './LoginPage'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>{ui}</ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe('LoginPage', () => {
  it('이메일, 비밀번호 입력 필드와 유효성 메시지를 렌더링한다.', () => {
    renderWithProviders(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()

    fireEvent.blur(emailInput)
    fireEvent.blur(passwordInput)

    expect(screen.getByText('ID를 입력해주세요.')).toBeInTheDocument()
    expect(screen.getByText('PW를 입력해주세요.')).toBeInTheDocument()
  })
})
