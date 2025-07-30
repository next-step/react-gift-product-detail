import { useQuery } from "@tanstack/react-query"
import ThemeInfoResponse from "@/interfaces/ThemeInfoResponse"
import { AxiosError } from "axios"
import axiosInstance from "@/utils/axiosInstance"

function useThemeInfo(themeId?: string) {
  const { data, isLoading, error } = useQuery<ThemeInfoResponse, AxiosError>({
    queryKey: ["themeInfo", themeId],
    queryFn: () => axiosInstance.get<ThemeInfoResponse>(`/api/themes/${themeId}/info`).then((res) => res.data),
    enabled: !!themeId,
  })

  return {
    theme: data?.data,
    loading: isLoading,
    error,
  }
}
export default useThemeInfo
