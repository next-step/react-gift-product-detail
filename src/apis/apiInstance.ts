import axios from 'axios'

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiInstance.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo')
  try {
    if (userInfo) {
      const { authToken } = JSON.parse(userInfo)
      if (authToken) {
        config.headers.Authorization = authToken
      }
    }
  } catch (error) {
    console.error('토큰 파싱 실패: ', error)
  }
  return config
})

export default apiInstance
