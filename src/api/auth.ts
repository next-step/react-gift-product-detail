import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query'
import { fetchApi } from './client'
import type { UserInfo } from '../utils/storage'

export interface LoginParams {
  email: string
  password: string
}

export async function postLogin(
  email: string,
  password: string,
): Promise<UserInfo> {
  const data = await fetchApi<UserInfo>('/api/login', {
    method: 'POST',
    body: { email, password },
  })

  const { email: userEmail, name, authToken } = data

  if (
    typeof userEmail !== 'string' ||
    typeof name !== 'string' ||
    typeof authToken !== 'string'
  ) {
       throw new Error('Invalid response from /api/login')
  }

  return { email: userEmail, name, authToken }
  }

export function useLoginMutation(
  options?: UseMutationOptions<UserInfo, Error, LoginParams>,
): UseMutationResult<UserInfo, Error, LoginParams> {
  return useMutation<UserInfo, Error, LoginParams>({
    mutationFn: ({ email, password }) => postLogin(email, password),
    ...options,
  })
}