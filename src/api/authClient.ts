import apiClient from '@/api'
import { STORAGES } from '@/api/constants'
import { ROUTE_PATH } from '@/shared/constants'
import { decodeUserInfo, getCookie } from '@/shared/utils'
import { toast } from 'react-toastify'

// * 인증이 필요한 요청용 클라이언트 생성
// ? apiClient 인스턴스 기본 설정 상속
const authClient = apiClient.create()

// * 토큰 인터셉터
authClient.interceptors.request.use(
  (config) => {
    // * 쿠키에서 userInfo 가져오기
    const savedUserInfo = getCookie(STORAGES.AUTH)
    if (savedUserInfo) {
      const decodeUser = decodeUserInfo(savedUserInfo)
      // authToken이 userInfo에 포함되어 있다고 가정
      if (decodeUser && decodeUser.authToken) {
        config.headers.Authorization = `${decodeUser.authToken}`
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// * 에러 처리 인터셉터
authClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const message = error.response?.data?.data?.message

    toast.error(message)
    if (status === 401) {
      // ! 401 에러가 발생하면 로그인 페이지로 연결
      window.location.href = ROUTE_PATH.LOGIN
    } else if (status === 404) {
      // ! 404 에러 시 홈으로 리다이렉트
      window.location.href = ROUTE_PATH.HOME
    }

    return Promise.reject(error)
  },
)

export default authClient
