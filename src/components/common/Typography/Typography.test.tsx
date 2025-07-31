import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { Typography } from './index'

describe('Typography 컴포넌트', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

  it('기본 props: variant="body1Regular", color="default", as="p"', () => {
    renderWithTheme(<Typography>기본 텍스트</Typography>)
    const el = screen.getByText('기본 텍스트')

    // body1Regular 스타일
    expect(el).toHaveStyle(`
      font-size: ${theme.typography.body1Regular.fontSize};
      font-weight: ${theme.typography.body1Regular.fontWeight};
      line-height: ${theme.typography.body1Regular.lineHeight};
    `)

    // default 텍스트 컬러
    expect(el).toHaveStyle(
      `color: ${theme.colors.semantic.text.default}`
    )

    // 태그 확인
    expect(el.tagName).toBe('P')
  })

  it('as="h2", variant="title2Bold", width, textAlign 적용', () => {
    renderWithTheme(
      <Typography
        as="h2"
        variant="title2Bold"
        width="300px"
        textAlign="center"
      >
        헤딩 텍스트
      </Typography>
    )
    const el = screen.getByText('헤딩 텍스트')

    // HTML 태그
    expect(el.tagName).toBe('H2')

    // title2Bold 스타일
    expect(el).toHaveStyle(`
      font-size: ${theme.typography.title2Bold.fontSize};
      font-weight: ${theme.typography.title2Bold.fontWeight};
      line-height: ${theme.typography.title2Bold.lineHeight};
    `)

    // 너비 및 정렬
    expect(el).toHaveStyle(`
      width: 300px;
      text-align: center;
    `)
  })

  it('color="critical" → semantic.critical.default', () => {
    renderWithTheme(
      <Typography color="critical">위험 경고</Typography>
    )
    expect(screen.getByText('위험 경고')).toHaveStyle(
      `color: ${theme.colors.semantic.critical.default}`
    )
  })

  it('scale 계열 컬러 예: color="gray500"', () => {
    renderWithTheme(
      <Typography color="gray500">스케일 컬러</Typography>
    )
    expect(screen.getByText('스케일 컬러')).toHaveStyle(
      `color: ${theme.colors.scale.gray500}`
    )
  })

  it('brand 계열 컬러 예: color="kakaoYellow"', () => {
    renderWithTheme(
      <Typography color="kakaoYellow">브랜드 컬러</Typography>
    )
    expect(screen.getByText('브랜드 컬러')).toHaveStyle(
      `color: ${theme.colors.semantic.brand.kakaoYellow}`
    )
  })

  it('text 계열 컬러 예: color="sub"', () => {
    renderWithTheme(
      <Typography color="sub">서브 텍스트 컬러</Typography>
    )
    expect(screen.getByText('서브 텍스트 컬러')).toHaveStyle(
      `color: ${theme.colors.semantic.text.sub}`
    )
  })
})
