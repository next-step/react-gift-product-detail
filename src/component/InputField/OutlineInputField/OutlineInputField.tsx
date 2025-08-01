import { forwardRef } from 'react'
import * as S from './OutlineInputField.styles'

interface OutlineInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  isError?: boolean
  errorMessage?: string
}

const OutlineInputField = forwardRef<HTMLInputElement, OutlineInputFieldProps>(
  ({ label, isError = false, errorMessage, ...props }, ref) => {
    return (
      <S.InputContainer>
        {label && <S.InputLabel>{label}</S.InputLabel>}
        <S.InputText ref={ref} isError={isError} {...props} />
        {errorMessage && <S.ErrorText>{errorMessage}</S.ErrorText>}
      </S.InputContainer>
    )
  }
)

OutlineInputField.displayName = 'OutlineInputField'

export default OutlineInputField
