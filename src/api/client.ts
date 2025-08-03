import type { QueryFunctionContext } from '@tanstack/react-query'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export interface FetchApiOptions {
  method?: HttpMethod
  params?: Record<string, string>
  body?: unknown
  headers?: Record<string, string>
}

export async function fetchApi<T>(
  url: string,
  optionsOrParams?: FetchApiOptions | Record<string, string>,
): Promise<T> {
  let options: FetchApiOptions

  if (
    optionsOrParams &&
    !('method' in optionsOrParams) &&
    !('body' in optionsOrParams) &&
    !('headers' in optionsOrParams) &&
    !('params' in optionsOrParams)
  ) {
    options = { params: optionsOrParams as Record<string, string> }
  } else {
    options = (optionsOrParams as FetchApiOptions) || {}
  }

  const { method = 'GET', params, body, headers } = options

  const query = params ? `?${new URLSearchParams(params).toString()}` : ''
  const res = await fetch(`${url}${query}`, {
    method,
    headers: body
      ? { 'Content-Type': 'application/json', ...headers }
      : headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })
  const contentType = res.headers.get('Content-Type')
  let json: unknown
  if (contentType?.includes('application/json')) {
    try {
      json = await res.json()
    } catch {
      json = undefined
    }
  } else {
    json = undefined
  }

  if (!res.ok) {
    interface ErrorResponse {
      data?: { message?: string; statusCode?: number }
      message?: string
      statusCode?: number
    }

    const parsed = json as ErrorResponse | undefined
    const message =
      parsed?.data?.message ||
      parsed?.message ||
      `Invalid response from ${url}`
    const error = new Error(message) as Error & { statusCode?: number }
    error.statusCode =
      parsed?.data?.statusCode || parsed?.statusCode || res.status
    throw error
  }
  if (res.status === 304) {
    return undefined as T
  }
  if (json === undefined) {
    return undefined as T
  }

  return (json.data ?? json) as T
}

export async function fetcher<T>(
  context: QueryFunctionContext<[string, FetchApiOptions?]>,
): Promise<T> {
  const [url, options] = context.queryKey
  return fetchApi<T>(url, options)
}
