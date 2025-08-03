import { screen, fireEvent, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from './LoginPage'
import { server } from '@/setupTests'
import { vi } from 'vitest'
import { renderWithProviders } from '@/test-utils'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: undefined }),
  }
})

const renderPage = () => {
  renderWithProviders(
    <MemoryRouter initialEntries={['/login']}>
      <LoginPage />
    </MemoryRouter>,
  )
}

describe('LoginPage', () => {
  it('올바른 정보를 입력하면 메인 페이지로 이동한다', async () => {
    server.use(
      http.post('/api/login', () => {
        return HttpResponse.json({
          email: 'user@example.com',
          name: 'User',
          authToken: 'token',
        })
      }),
    )

    renderPage()

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'user@example.com' },
    })
    fireEvent.blur(screen.getByPlaceholderText('이메일'))
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'password123' },
    })
    fireEvent.blur(screen.getByPlaceholderText('비밀번호'))

    fireEvent.click(screen.getByRole('button', { name: '로그인' }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
    })
  })

  it('잘못된 입력 시 오류 메시지를 표시한다', async () => {
    renderPage()

    const emailInput = screen.getByPlaceholderText('이메일')
    fireEvent.blur(emailInput)

    expect(await screen.findByText('ID를 입력해주세요.')).toBeInTheDocument()

    fireEvent.change(emailInput, { target: { value: 'wrong' } })
    fireEvent.blur(emailInput)

    expect(
      await screen.findByText('ID는 이메일 형식으로 입력해주세요.'),
    ).toBeInTheDocument()

    const passwordInput = screen.getByPlaceholderText('비밀번호')
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.blur(passwordInput)

    expect(
      await screen.findByText('비밀번호는 8자 이상이어야 합니다.'),
    ).toBeInTheDocument()
  })
})
