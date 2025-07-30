import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '@/context/AuthContext'
import { useContext } from 'react'
import { ROUTE_PATH } from '@/pages/Routes'

type LoginFormInputs = { email: string; password: string }

type LoginSuccessResponse = {
  data: {
    authToken: string
    email: string
    name: string
  }
}

export function useLogin() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
  const { login } = useContext(AuthContext)!

  return useMutation<
    LoginSuccessResponse,
    any,
    LoginFormInputs
  >({
    mutationFn: (payload) =>
      axios.post<LoginSuccessResponse>('/api/login', payload).then(res => res.data),
    onSuccess: ({ data }) => {
      const { authToken, email, name } = data
      login({ user: { email, name }, token: authToken })
      sessionStorage.setItem(
        'auth',
        JSON.stringify({ user: { email, name }, token: authToken })
      )
      const target = redirect ? decodeURIComponent(redirect) : ROUTE_PATH.HOME
      navigate(target, { replace: true })
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response) {
        const msg = err.response.data?.data?.message || err.response.statusText
        toast.error(msg)
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.')
      }
    }
  })
}