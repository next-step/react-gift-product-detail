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

export const API_PATH = {
  RANKING: '/products/ranking',
  THEMES: '/themes',
  LOGIN: '/login',
  ORDER: '/order',
  PRODUCTS_SUMMARY: (productId: number) => `/products/${productId}/summary`,
  PRODUCT_INFO: (productId: number) => `/products/${productId}`,
  PRODUCT_REVIEW: (productId: number) =>
    `/products/${productId}/highlight-review`,
  PRODUCT_DETAIL: (productId: number) => `/products/${productId}/detail`,
  PRODUCT_WISH: (productId: number) => `/products/${productId}/wish`,
  THEME_INFO: (themeId: number) => `/themes/${themeId}/info`,
  THEME_PRODUCTS: (themeId: number) => `/themes/${themeId}/products`,
} as const
