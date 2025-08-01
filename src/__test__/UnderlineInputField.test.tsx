import { render, screen } from '@testing-library/react'
import UnderlineInputField from '@/component/InputField/UnderlineInputField/UnderlineInputField'

describe('UnderlineInputField', () => {
  it('input이 렌더링된다', () => {
    render(<UnderlineInputField />) // Given, When
    expect(screen.getByRole('textbox')).toBeInTheDocument() // Then
  })

  it('errorMessage가 있으면 에러 메시지가 렌더링 됨', () => {
    const errorMessage = '필수 입력입니다' // Given
    render(<UnderlineInputField errorMessage={errorMessage} />) // When
    expect(screen.getByText(errorMessage)).toBeInTheDocument() // Then
  })

  it('errorMessage가 없으면 에러 메시지가 렌더링되지 않는다', () => {
    render(<UnderlineInputField />) // Given, When
    expect(screen.queryByText('필수 입력입니다')).not.toBeInTheDocument() // Then
  })
})
