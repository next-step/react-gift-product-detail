import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserContext } from '@/contexts/UserContext'
import { apiPost } from '@/lib/axios'
import type { LoginFormInputs } from '../schema/loginSchema'
import { useMutation } from '@tanstack/react-query'

interface LoginResponse {
  email: string
  name: string
  authToken: string
}

export const useLoginSubmit = (redirectPath: string) => {
  const navigate = useNavigate()
  const { login } = useUserContext()

  const submitLogin = async (userInfo: LoginFormInputs) => {
    const res = await apiPost<LoginResponse, LoginFormInputs>('/login', {
      email: userInfo.email,
      password: userInfo.password,
    })
    return res
  }

  const mutation = useMutation({
    mutationFn: submitLogin,
    onSuccess: (userInfo) => {
      const { email, name, authToken } = userInfo ?? {}
      login({ email, nickname: name, authToken })
      navigate(redirectPath, { replace: true })
    },
    onError: (err: any) => {
      if (err.response?.status === 400) {
        toast.error(err.response.data.data.message)
      } else {
        toast.error('로그인 중 오류가 발생하였습니다.')
        console.log(err.response?.data)
      }
    },
  })

  return {
    submitLogin: mutation.mutate,
    ...mutation,
  }
}
