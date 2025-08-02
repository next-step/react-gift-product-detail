// src/pages/Login/components/LoginFormSection/LoginForm.test.tsx

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { useLogin } from '@/hooks/useLogin'
import { LoginForm } from './LoginForm'

// useLogin 훅을 jest.Mock 으로 모킹
jest.mock('@/hooks/useLogin')
const mockUseLogin = useLogin as jest.Mock

describe('LoginForm', () => {
  // 렌더 후 Hook Form 초기 업데이트 반영
  async function renderForm() {
    render(
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    )
    // React Hook Form 의 초기 validation/state 업데이트를 기다립니다
    await waitFor(() => {})
  }

  beforeEach(() => {
    mockUseLogin.mockReturnValue({
      mutate: jest.fn(),
      error: undefined,
    })
  })

  it('초기 렌더링: 이메일/비밀번호 input, 로그인 버튼 비활성화', async () => {
    await renderForm()

    expect(screen.getByPlaceholderText(/이메일/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/비밀번호/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /로그인/ })).toBeDisabled()
  })

  it('유효한 값 입력 후 onSubmit 시 useLogin.mutate 호출', async () => {
    const mockMutate = jest.fn()
    mockUseLogin.mockReturnValue({ mutate: mockMutate, error: undefined })

    await renderForm()
    const user = userEvent.setup()

    await user.type(screen.getByPlaceholderText(/이메일/), 'test@example.com')
    await user.type(screen.getByPlaceholderText(/비밀번호/), 'validPassword')

    // 버튼 활성화 대기
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /로그인/ })
      ).toBeEnabled()
    )

    await user.click(screen.getByRole('button', { name: /로그인/ }))

    expect(mockMutate).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'validPassword',
    })
  })

  it('서버 에러가 있을 때 에러 메시지 표시', async () => {
    const fakeError = {
      response: { data: { data: { message: '로그인 실패' } } },
    }
    mockUseLogin.mockReturnValue({ mutate: jest.fn(), error: fakeError })

    await renderForm()
    expect(screen.getByText('로그인 실패')).toBeInTheDocument()
  })
})
