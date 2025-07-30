import React from 'react'
import { useForm } from 'react-hook-form'
import { LoginFormSection } from './index'
import { useLogin } from '@/hooks/useLogin'

// 유효성 검사용 정규식 및 상수
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN_LENGTH = 8

type LoginFormInputs = { email: string; password: string }

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting }
  } = useForm<LoginFormInputs>({
    mode: 'onChange',
    defaultValues: { email: '', password: '' }
  })

  const email = watch('email')
  const password = watch('password')

  const { mutate: loginMutate, error } = useLogin()

  const onFormSubmit = handleSubmit((data) => {
    loginMutate(data)
  })

  return (
    <LoginFormSection
      email={email}
      password={password}
      onChangeEmail={e => setValue('email', e.target.value)}
      onChangePassword={e => setValue('password', e.target.value)}
      onSubmit={onFormSubmit}
      emailError={errors.email?.message}
      passwordError={errors.password?.message}
      loginError={error?.response?.data.data.message}
      isFormValid={isValid && !isSubmitting}
    />
  )
}

export default LoginForm
