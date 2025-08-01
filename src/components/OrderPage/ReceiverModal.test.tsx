import { render, screen, fireEvent } from '@testing-library/react'
import { ReceiverModal } from './ReceiverModal'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { useForm, useFieldArray } from 'react-hook-form'
import type { FormValues } from '@/components/OrderPage/OrderForm'

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

const Wrapper = () => {
  const { register, control, formState, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: { receivers: [{ name: '', phone: '', quantity: 1 }] },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'receivers',
  })

  const onConfirm = handleSubmit(() => {})

  return (
    <ReceiverModal
      fields={fields}
      register={register}
      errors={formState.errors}
      append={append}
      remove={remove}
      closeModal={() => {}}
      confirmModal={onConfirm}
    />
  )
}

describe('ReceiverModal', () => {
  it('입력 필드를 렌더링한다.', async () => {
    renderWithTheme(<Wrapper />)

    expect(screen.getAllByPlaceholderText('이름')[0]).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText('전화번호')[0]).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText('수량')[0]).toBeInTheDocument()
  })

  it('헤더에 "받는 사람" 텍스트가 렌더링된다.', () => {
    renderWithTheme(<Wrapper />)
    expect(screen.getByText('받는 사람')).toBeInTheDocument()
  })

  it('추가하기, 취소, 완료 버튼이 렌더링된다.', () => {
    renderWithTheme(<Wrapper />)

    expect(screen.getByRole('button', { name: '추가하기' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /명 완료$/ })).toBeInTheDocument()
  })

  it('입력 필드가 빈 상태에서 완료 버튼을 누르면 에러 메시지가 표시된다.', async () => {
    renderWithTheme(<Wrapper />)

    const confirmButton = screen.getByRole('button', { name: /명 완료/ })
    fireEvent.click(confirmButton)

    const error = await screen.findByText(/이름을 입력해주세요./)
    expect(error).toBeInTheDocument()
  })

  it('올바른 값 입력 시 에러 메시지가 사라진다.', async () => {
    renderWithTheme(<Wrapper />)

    const confirmButton = screen.getByRole('button', { name: /명 완료/ })

    fireEvent.click(confirmButton)
    const error = await screen.findByText(/이름을 입력해주세요./)
    expect(error).toBeInTheDocument()

    const nameInput = screen.getByPlaceholderText('이름')
    fireEvent.change(nameInput, { target: { value: '홍길동' } })

    fireEvent.click(confirmButton)

    await new Promise((r) => setTimeout(r, 100))
    expect(screen.queryByText(/이름을 입력해주세요./)).not.toBeInTheDocument()
  })
})
