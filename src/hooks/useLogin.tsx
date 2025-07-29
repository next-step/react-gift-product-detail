import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

interface LoginVars {
  email: string
  password: string
}
interface LoginData {
  authToken: string
  email: string
  name: string
}

export function useLogin() {
  const qc = useQueryClient()
  const baseUrl = import.meta.env.VITE_BASE_URL
  const loginUrl = new URL("/api/login", baseUrl).toString()

  return useMutation<LoginData, Error, LoginVars>({
    mutationFn: (vars) => axios.post(loginUrl, vars).then((r) => r.data.data),
    onSuccess: (data) => {
      qc.setQueryData(["auth"], data)
      localStorage.setItem("authToken", data.authToken)
      localStorage.setItem("email", data.email)
      localStorage.setItem("name", data.name)
    },
  })
}
