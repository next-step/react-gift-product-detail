import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  email: string
  name: string
  authToken: string
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/login`,
    data
  )
  return response.data.data
}

export function useLoginMutation() {
  return useMutation({ mutationFn: login })
}
