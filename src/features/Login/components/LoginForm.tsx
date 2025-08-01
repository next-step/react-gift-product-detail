import * as S from './LoginForm.styles'
import KaKaoTitleIcon from '@/assets/icons/kakao-title.svg?react'
import MyButton from '@/component/Button/Button'
import UnderlineInputField from '@/component/InputField/UnderlineInputField/UnderlineInputField'
import { useLoginForm } from '@/features/Login/hooks/useLoginForm'
import { useLoginSubmit } from '@/features/Login/hooks/useLoginSubmit'

interface LoginFormProps {
  redirectPath: string
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectPath }) => {
  const methods = useLoginForm()
  const { submitLogin } = useLoginSubmit(redirectPath)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = methods

  const onSubmit = handleSubmit((data) => submitLogin(data))

  return (
    <S.Container>
      <form onSubmit={onSubmit}>
        <S.FormContainer>
          <S.KakaoTitle>
            <KaKaoTitleIcon />
          </S.KakaoTitle>

          <UnderlineInputField
            placeholder="이메일"
            type="email"
            {...register('email')}
            isError={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <UnderlineInputField
            placeholder="비밀번호"
            type="password"
            {...register('password')}
            isError={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <MyButton
            type="submit"
            variant="primary"
            size="large"
            disabled={!isValid}
            fullWidth
            style={{ marginTop: '32px' }}
          >
            로그인
          </MyButton>
        </S.FormContainer>
      </form>
    </S.Container>
  )
}

export default LoginForm
