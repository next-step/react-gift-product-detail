import type { InputChangeHandler, InputBlurHandler} from '@/shared/types';
import type { InputType } from '@/shared/ui/atoms/Input';
import * as S from './styles';

interface LoginInputFieldProps {
  type: Extract<InputType, 'text' | 'password' | 'email'>;
  placeholder: string;
  value: string;
  onChange: InputChangeHandler;
  onBlur: InputBlurHandler;
  error?: string; //hasError삭제 
}

const LoginInputField = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error
}: LoginInputFieldProps) => {
  return (
    <S.InputContainer>
      <S.Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.InputContainer>
  );
};

export default LoginInputField; 