import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/utils/axiosInstance"

interface LoginVars {
  email: string
  password: string
}
interface LoginData {
  authToken: string | null
  email: string
  name: string
}

export function useLogin(onSuccess?: () => void) {
  const qc = useQueryClient()

  return useMutation<LoginData, Error, LoginVars>({
    mutationFn: (vars) => axiosInstance.post("/api/login", vars).then((r) => r.data.data),
    onSuccess: (data) => {
      qc.setQueryData(["auth"], data)
      localStorage.setItem("authToken", data.authToken || "")
      localStorage.setItem("email", data.email)
      localStorage.setItem("name", data.name)
      onSuccess?.()
    },
  })
}
