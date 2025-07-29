import React, { useCallback } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { AuthContext, AuthContextType } from "./AuthContext"

const STORAGE_KEYS = {
  token: "authToken",
  email: "email",
  name: "name",
} as const

interface LoginResponse {
  code: number
  data: {
    authToken: string
    email: string
    name: string
  }
  error?: string
}

interface AuthContextProviderProps {
  children: React.ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const qc = useQueryClient()

  const loginMutation = useMutation<
    LoginResponse["data"],
    Error,
    { email: string; password: string }
  >({
    mutationFn: async ({ email, password }) => {
      const baseUrl = import.meta.env.VITE_BASE_URL
      const loginUrl = new URL("/api/login", baseUrl).toString()
      const { data } = await axios.post<LoginResponse>(loginUrl, {
        email,
        password,
      })
      return data.data
    },
    onSuccess: (data) => {
      qc.setQueryData(["auth"], data)

      localStorage.setItem(STORAGE_KEYS.token, data.authToken)
      localStorage.setItem(STORAGE_KEYS.email, data.email)
      localStorage.setItem(STORAGE_KEYS.name, data.name)
    },
  })

  const login = useCallback(
    async (email: string, password: string) => {
      if (!email || !password) return false
      try {
        await loginMutation.mutateAsync({ email, password })
        console.log("로그인 성공")
        return true
      } catch (e) {
        console.error("로그인 실패", e)
        return false
      }
    },
    [loginMutation]
  )

  const logout = useCallback(() => {
    qc.removeQueries({ queryKey: ["auth"] })

    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.email)
    localStorage.removeItem(STORAGE_KEYS.name)

    console.log("logout 완료")
  }, [qc])

  const cached = (qc.getQueryData<LoginResponse["data"]>([
    "auth",
  ]) as LoginResponse["data"]) ?? {
    authToken: localStorage.getItem(STORAGE_KEYS.token),
    email: localStorage.getItem(STORAGE_KEYS.email) ?? "",
    name: localStorage.getItem(STORAGE_KEYS.name) ?? "",
  }
  const value: AuthContextType = {
    isLoggedIn: !!cached.authToken,
    authToken: cached.authToken,
    email: cached.email,
    name: cached.name,
    login,
    logout,
    isLoggingIn: loginMutation.isPending,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
