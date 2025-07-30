import { useQuery } from "@tanstack/react-query"
import ThemeInfoResponse from "@/interfaces/ThemeInfoResponse"
import { AxiosError } from "axios"
import useFetch from "../functions/fetchHandler"

function useThemeInfo(themeId?: string) {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const url = themeId
    ? new URL(`/api/themes/${themeId}/info`, baseUrl).toString()
    : ""

  const { data, isLoading, error } = useQuery<ThemeInfoResponse, AxiosError>({
    queryKey: ["themeInfo", themeId],
    queryFn: () => useFetch<ThemeInfoResponse>(url),
    enabled: !!themeId,
  })

  return {
    theme: data?.data,
    loading: isLoading,
    error,
  }
}
export default useThemeInfo
