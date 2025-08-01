import { render, screen } from '@testing-library/react'
import OutlineInputField from '@/component/InputField/OutlineInputField/OutlineInputField'

describe('OutlineInputField', () => {
  test('input이 렌더링 됨', () => {
    render(<OutlineInputField />) // Given
    const input = screen.getByRole('textbox') // When
    expect(input).toBeInTheDocument() // Then
  })

  test('label이 있으면 렌더링 됨', () => {
    const labelText = '이메일'
    render(<OutlineInputField label={labelText} />) // Given
    const label = screen.getByText(labelText) // When
    expect(label).toBeInTheDocument() // Then
  })

  test('errorMessage가 있으면 렌더링 됨', () => {
    const errorText = '필수 입력입니다'
    render(<OutlineInputField errorMessage={errorText} />) // Given
    const error = screen.getByText(errorText) // When
    expect(error).toBeInTheDocument() // Then
  })
})
