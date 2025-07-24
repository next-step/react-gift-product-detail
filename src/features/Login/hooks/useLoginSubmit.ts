import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useUserContext } from '@/contexts/UserContext'
import { api } from '@/lib/axios'
import type { LoginFormInputs } from '../schema/loginSchema'
import { useMutation } from '@tanstack/react-query'

export const useLoginSubmit = (redirectPath: string) => {
  const navigate = useNavigate()
  const { login } = useUserContext()

  const submitLogin = async (userInfo: LoginFormInputs) => {
    const res = await api.post('/login', {
      email: userInfo.email,
      password: userInfo.password,
    })
    return res.data.data
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
