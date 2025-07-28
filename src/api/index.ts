import { ROUTE_PATH } from '@/shared/constants'
import axios from 'axios'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// * axios 인스턴스
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

// * 에러 처리 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const message = error.response?.data?.data?.message

    toast.error(message)
    if (status === 404) {
      // ! 404 에러 시 홈으로 리다이렉트
      window.location.href = ROUTE_PATH.HOME
    }
    return Promise.reject(error)
  },
)

export default apiClient
