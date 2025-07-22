import apiClient from '@/api'
import { API_ENDPOINTS } from '@/api/constants'
import type { LoginRequest, LoginResponse } from '@/api/types'

// * 로그인 요청하기
export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await apiClient.post<{ data: LoginResponse }>(API_ENDPOINTS.AUTH.LOGIN, data)
  return res.data.data
}
