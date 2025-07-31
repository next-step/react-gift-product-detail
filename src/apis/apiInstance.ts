import axios from 'axios'

const USER_INFO_KEY = 'userInfo'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiInstance.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem(USER_INFO_KEY)
  if (!userInfo) return config

  try {
    const { authToken } = JSON.parse(userInfo)
    if (!authToken) return config
    config.headers.Authorization = authToken
  } catch (error) {
    console.error('토큰 파싱 실패: ', error)
  }
  return config
})

export default apiInstance
