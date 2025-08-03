import type { QueryFunctionContext } from '@tanstack/react-query'

const responseCache = new Map<string, unknown>()
export interface FetchApiOptions {
  method?: string
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
  const text = await res.text()
  let json: any
  try {
    json = text ? JSON.parse(text) : undefined
  } catch {
    json = undefined
  }

  if (!res.ok) {
    const message =
      json?.data?.message || json?.message || `Invalid response from ${url}`
    const error = new Error(message)
    ;(error as any).statusCode =
      json?.data?.statusCode || json?.statusCode || res.status
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
