import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, test, expect } from 'vitest'
import LoginFormSection from '../LoginFormSection'
import { AuthProvider } from '@/contexts/AuthContext'
import type { UserInfo } from '@/utils/storage'
import { server } from '../../setupTests'

function renderComponent(onSuccess?: (info: UserInfo) => void) {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoginFormSection onSuccess={onSuccess} />
      </AuthProvider>
    </QueryClientProvider>,
  )
}

describe('LoginFormSection', () => {
  test('입력 검증', async () => {
    renderComponent()

    const emailInput = screen.getByPlaceholderText('이메일') as HTMLInputElement
    const passwordInput = screen.getByPlaceholderText('비밀번호') as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: '로그인' })

    expect(submitButton).toBeDisabled()

    fireEvent.blur(emailInput)
    expect(await screen.findByText('ID를 입력해주세요.')).toBeInTheDocument()

    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    fireEvent.blur(emailInput)
    expect(await screen.findByText('ID는 이메일 형식으로 입력해주세요.')).toBeInTheDocument()

    fireEvent.change(emailInput, { target: { value: 'tester@example.com' } })
    fireEvent.blur(emailInput)
    await waitFor(() => {
      expect(screen.queryByText('ID를 입력해주세요.')).toBeNull()
      expect(screen.queryByText('ID는 이메일 형식으로 입력해주세요.')).toBeNull()
    })

    fireEvent.blur(passwordInput)
    expect(await screen.findByText('비밀번호를 입력해주세요.')).toBeInTheDocument()

    fireEvent.change(passwordInput, { target: { value: '1234' } })
    fireEvent.blur(passwordInput)
    expect(await screen.findByText('비밀번호는 8자 이상이어야 합니다.')).toBeInTheDocument()

    fireEvent.change(passwordInput, { target: { value: '12345678' } })
    fireEvent.blur(passwordInput)
    await waitFor(() => {
      expect(screen.queryByText('비밀번호를 입력해주세요.')).toBeNull()
      expect(screen.queryByText('비밀번호는 8자 이상이어야 합니다.')).toBeNull()
      expect(submitButton).toBeEnabled()
    })
  })

  test('로그인 성공 시 onSuccess 호출', async () => {
    const mockInfo: UserInfo = {
      email: 'tester@example.com',
      name: '테스터',
      authToken: 'token123',
    }
    server.use(
      http.post('/api/login', () => {
        return HttpResponse.json(mockInfo)
      }),
    )

    const handleSuccess = vi.fn()
    renderComponent(handleSuccess)

    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const submitButton = screen.getByRole('button', { name: '로그인' })

    fireEvent.change(emailInput, { target: { value: mockInfo.email } })
    fireEvent.change(passwordInput, { target: { value: '12345678' } })
    fireEvent.blur(emailInput)
    fireEvent.blur(passwordInput)

    await waitFor(() => expect(submitButton).toBeEnabled())

    fireEvent.click(submitButton)

    await waitFor(() => expect(handleSuccess).toHaveBeenCalledWith(mockInfo))
  })
})