import { forwardRef } from 'react'
import * as S from './UnderlineInputField.styles'

interface UnderlineInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
  errorMessage?: string
}

const UnderlineInputField = forwardRef<
  HTMLInputElement,
  UnderlineInputFieldProps
>(({ isError = false, errorMessage, ...props }, ref) => {
  return (
    <>
      <S.Input ref={ref} isError={isError} {...props} />
      <S.ErrorMessage isActive={!!errorMessage}>{errorMessage}</S.ErrorMessage>
    </>
  )
})

UnderlineInputField.displayName = 'UnderlineInputField'

export default UnderlineInputField
