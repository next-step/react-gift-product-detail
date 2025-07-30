import { useQuery } from "@tanstack/react-query"
import ThemeInfoResponse from "@/interfaces/ThemeInfoResponse"
import { AxiosError } from "axios"
import fetchHandler from "@/functions/fetchHandler"

function useThemeInfo(themeId?: string) {
  const { data, isLoading, error } = useQuery<ThemeInfoResponse, AxiosError>({
    queryKey: ["themeInfo", themeId],
    queryFn: () => fetchHandler<ThemeInfoResponse>(`/api/themes/${themeId}/info`),
    enabled: !!themeId,
  })
  

  return {
    theme: data?.data,
    loading: isLoading,
    error,
  }
}
export default useThemeInfo
