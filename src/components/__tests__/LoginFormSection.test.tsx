import { screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { vi, describe, test, expect } from 'vitest'
import { toast } from 'react-toastify'
import LoginFormSection from '../LoginFormSection'
import type { UserInfo } from '@/utils/storage'
import { server } from '../../setupTests'

import { renderWithProviders } from '@/test-utils'

describe('LoginFormSection', () => {
  test('이메일 입력 검증', async () => {
    renderWithProviders(<LoginFormSection />)

    const emailInput = screen.getByPlaceholderText('이메일') as HTMLInputElement

    fireEvent.blur(emailInput)
    expect(await screen.findByText('ID를 입력해주세요.')).toBeInTheDocument()

    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    fireEvent.blur(emailInput)
    expect(
      await screen.findByText('ID는 이메일 형식으로 입력해주세요.'),
    ).toBeInTheDocument()
  })

  test('유효한 이메일을 입력하면 이메일 관련 에러 메시지가 사라진다', async () => {
    renderWithProviders(<LoginFormSection />)

    const emailInput = screen.getByPlaceholderText('이메일') as HTMLInputElement

    fireEvent.blur(emailInput)
    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    fireEvent.blur(emailInput)

    fireEvent.change(emailInput, { target: { value: 'tester@example.com' } })
    fireEvent.blur(emailInput)

    await waitFor(() => {
      expect(screen.queryByText('ID를 입력해주세요.')).toBeNull()
      expect(
        screen.queryByText('ID는 이메일 형식으로 입력해주세요.'),
      ).toBeNull()
    })
      })

  test('비밀번호 입력 검증', async () => {
    renderWithProviders(<LoginFormSection />)

    const emailInput = screen.getByPlaceholderText('이메일') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'tester@example.com' } })
    fireEvent.blur(emailInput)

    const passwordInput = screen.getByPlaceholderText('비밀번호') as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: '로그인' })

    expect(submitButton).toBeDisabled()

    fireEvent.blur(passwordInput)
    expect(
      await screen.findByText('비밀번호를 입력해주세요.'),
    ).toBeInTheDocument()

    fireEvent.change(passwordInput, { target: { value: '1234' } })
    fireEvent.blur(passwordInput)
    expect(
      await screen.findByText('비밀번호는 8자 이상이어야 합니다.'),
    ).toBeInTheDocument()

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
    renderWithProviders(<LoginFormSection onSuccess={handleSuccess} />)

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
   test('로그인 실패 시 에러 토스트를 표시한다', async () => {
    server.use(
      http.post('/api/login', () => {
        return HttpResponse.json(
          { message: '이메일 또는 비밀번호가 올바르지 않습니다.' },
          { status: 401 },
        )
      }),
    )

    const handleSuccess = vi.fn()
    const toastSpy = vi.spyOn(toast, 'error').mockImplementation(() => {})
    renderWithProviders(<LoginFormSection onSuccess={handleSuccess} />)

    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const submitButton = screen.getByRole('button', { name: '로그인' })

    fireEvent.change(emailInput, { target: { value: 'tester@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '12345678' } })
    fireEvent.blur(emailInput)
    fireEvent.blur(passwordInput)

    await waitFor(() => expect(submitButton).toBeEnabled())

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(handleSuccess).not.toHaveBeenCalled()
      expect(toastSpy).toHaveBeenCalledWith(
        '이메일 또는 비밀번호가 올바르지 않습니다.',
      )
    })
  })
})
