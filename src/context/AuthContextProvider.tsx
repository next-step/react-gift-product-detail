import React, { useCallback, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { AuthContext, AuthContextType } from "./AuthContext"
import { useLogin } from "@/hooks/useLogin"
import { useEffect } from "react"
interface LoginData {
  authToken: string | null
  email: string
  name: string
}

interface AuthContextProviderProps {
  children: React.ReactNode
  initialValue?: LoginData
}

export function AuthContextProvider({
  children,
  initialValue,
}: AuthContextProviderProps) {
  const qc = useQueryClient()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  useEffect(() => {
    if (!initialValue) return

    const seed: LoginData = {
      authToken: initialValue.authToken ?? null,
      email: initialValue.email ?? "",
      name: initialValue.name ?? "",
    }

    if (seed.authToken) localStorage.setItem("authToken", seed.authToken)
    if (seed.email) localStorage.setItem("email", seed.email)
    if (seed.name) localStorage.setItem("name", seed.name)

    qc.setQueryData(["auth"], seed)
  }, [])
  const loginMutation = useLogin(() => {
    setIsLoggingOut(false)
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
    setIsLoggingOut(true)

    // localStorage 제거
    localStorage.removeItem("authToken")
    localStorage.removeItem("email")
    localStorage.removeItem("name")

    // 캐시에서 auth 쿼리 데이터를 완전히 제거
    qc.removeQueries({ queryKey: ["auth"] })

    // 캐시를 명시적으로 null로 설정
    qc.setQueryData(["auth"], null)

    // 캐시 무효화
    qc.invalidateQueries({ queryKey: ["auth"] })

    console.log("logout 완료")
  }, [qc])

  // 로그아웃 상태가 true면 빈 상태 반환
  if (isLoggingOut) {
    const logoutValue: AuthContextType = {
      isLoggedIn: false,
      authToken: null,
      email: "",
      name: "",
      login,
      logout,
      isLoggingIn: loginMutation.isPending,
    }
    return (
      <AuthContext.Provider value={logoutValue}>
        {children}
      </AuthContext.Provider>
    )
  }

  const cached = qc.getQueryData<LoginData>(["auth"])

  // 캐시가 null이면 로그아웃 상태, 아니면 localStorage에서 가져옴
  const authData: LoginData =
    cached !== null
      ? (cached ?? {
          authToken: localStorage.getItem("authToken") || null,
          email: localStorage.getItem("email") || "",
          name: localStorage.getItem("name") || "",
        })
      : {
          authToken: null,
          email: "",
          name: "",
        }

  const value: AuthContextType = {
    isLoggedIn: !!authData.authToken,
    authToken: authData.authToken,
    email: authData.email,
    name: authData.name,
    login,
    logout,
    isLoggingIn: loginMutation.isPending,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
