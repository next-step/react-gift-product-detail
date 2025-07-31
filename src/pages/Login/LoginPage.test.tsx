// src/pages/Login/LoginPage.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'

// LoginFormSection 컴포넌트는 위치 확인만 하면 되므로 간단히 모킹
jest.mock('@/pages/Login/components/LoginFormSection', () => ({
  LoginForm: () => <div data-testid="login-form" />,
}))

import LoginPage from './LoginPage'

describe('LoginPage', () => {
  const renderPage = () =>
    render(
      <ThemeProvider theme={theme}>
        <LoginPage />
      </ThemeProvider>
    )

  it('로고 이미지와 로그인 폼이 함께 렌더링된다', () => {
    renderPage()

    // alt 텍스트로 이미지 찾기
    const logo = screen.getByAltText('카카오 공식 로고') as HTMLImageElement
    expect(logo).toBeInTheDocument()
    // SVG는 fileMock.js로 모킹되므로 stub 값이 src가 된다
    expect(logo.src).toContain('test-file-stub')

    // 모킹된 LoginForm stub
    expect(screen.getByTestId('login-form')).toBeInTheDocument()
  })

  it('Wrapper가 <main> 태그로 렌더링된다', () => {
    renderPage()
    // login-form stub의 부모가 바로 <main>입니다
    const wrapper = screen.getByTestId('login-form').parentElement!
    expect(wrapper.tagName).toBe('MAIN')
  })
})
