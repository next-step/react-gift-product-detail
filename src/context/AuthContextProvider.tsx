import React, { useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { AuthContext, AuthContextType } from "./AuthContext"
import { useLogin } from "@/hooks/useLogin"

interface LoginData {
  authToken: string
  email: string
  name: string
}

interface AuthContextProviderProps {
  children: React.ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const qc = useQueryClient()
  const loginMutation = useLogin()

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

    localStorage.removeItem("authToken")
    localStorage.removeItem("email")
    localStorage.removeItem("name")

    console.log("logout 완료")
  }, [qc])

  const cached = (qc.getQueryData<LoginData>(["auth"]) as LoginData) ?? {
    authToken: localStorage.getItem("authToken"),
    email: localStorage.getItem("email") ?? "",
    name: localStorage.getItem("name") ?? "",
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
