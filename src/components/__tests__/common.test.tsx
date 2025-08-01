import { render, screen } from '@testing-library/react'
import { ErrorMessage, YellowButton } from '../common'
import { colors } from '@/theme/color'

describe('ErrorMessage', () => {
  it('기본 스타일이 적용된다', () => {
    render(<ErrorMessage>에러 발생</ErrorMessage>)
    const element = screen.getByText('에러 발생')
    expect(element).toHaveStyle(`color: ${colors.status.critical}`)
  })
})

describe('YellowButton', () => {
  it('노란색 배경을 가진다', () => {
    render(<YellowButton>버튼</YellowButton>)
    const button = screen.getByRole('button', { name: '버튼' })
    expect(button).toHaveStyle(`background-color: ${colors.brand.kakaoYellow}`)
  })

  it('비활성화 시 반투명해진다', () => {
    render(<YellowButton disabled>비활성화</YellowButton>)
    const button = screen.getByRole('button', { name: '비활성화' })
    expect(button).toBeDisabled()
    expect(button).toHaveStyle('opacity: 0.5')
  })
})