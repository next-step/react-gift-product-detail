import { render, screen, fireEvent } from '@testing-library/react'
import { SenderInput } from './SenderInput'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { useForm } from 'react-hook-form'
import type { FormValues } from '@/components/OrderPage/OrderForm'

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const Wrapper = ({ defaultSender = '' }: { defaultSender?: string }) => {
  const { register, formState, getValues, trigger } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { sender: defaultSender },
  })

  return (
    <>
      <SenderInput register={register} error={formState.errors.sender} />
      <button onClick={() => trigger('sender')}>Validate</button>
      <div data-testid="value">{getValues('sender')}</div>
    </>
  )
}

describe('SenderInput', () => {
  it('보내는 사람 입력 필드와 라벨을 렌더링한다.', () => {
    renderWithTheme(<Wrapper />)

    const input = screen.getByPlaceholderText('이름을 입력하세요.')
    const label = screen.getByText('보내는 사람')

    expect(input).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })

  it('입력한 이름이 상태에 반영된다.', () => {
    renderWithTheme(<Wrapper />)

    const input = screen.getByPlaceholderText('이름을 입력하세요.')
    fireEvent.change(input, { target: { value: '홍길동' } })

    expect(input).toHaveValue('홍길동')
  })

  it('이름을 입력하지 않으면 에러 메시지가 렌더링된다.', async () => {
    renderWithTheme(<Wrapper />)

    const button = screen.getByText('Validate')
    fireEvent.click(button)

    const error = await screen.findByText('이름을 입력해주세요.')
    expect(error).toBeInTheDocument()
  })

  it('기본값이 있으면 초기 입력 필드에 표시된다.', () => {
    renderWithTheme(<Wrapper defaultSender="홍길동" />)

    const input = screen.getByPlaceholderText(
      '이름을 입력하세요.'
    ) as HTMLInputElement
    expect(input.value).toBe('홍길동')
  })

  it('입력 필드에 올바른 값을 입력하면 에러 메시지가 사라진다.', async () => {
    renderWithTheme(<Wrapper />)

    const input = screen.getByPlaceholderText('이름을 입력하세요.')
    const button = screen.getByText('Validate')

    fireEvent.change(input, { target: { value: '' } })
    fireEvent.click(button)

    const error = await screen.findByText('이름을 입력해주세요.')
    expect(error).toBeInTheDocument()

    fireEvent.change(input, { target: { value: '홍길동' } })
    fireEvent.click(button)

    await screen.findByDisplayValue('홍길동')
    expect(screen.queryByText('이름을 입력해주세요.')).not.toBeInTheDocument()
  })
})
