import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (res) => {
    return res.data.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export const apiGet = <T>(url: string, config?: any): Promise<T> => {
  return api.get(url, config)
}

export const apiPost = <TResponse, TRequest = unknown>(
  url: string,
  data?: TRequest,
  config?: any
): Promise<TResponse> => {
  return api.post(url, data, config)
}
