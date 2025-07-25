import { useSuspenseQueryApi } from '@/apis/useQueryApi';

export interface Theme {
  themeId: number;
  name: string;
  image: string;
}

interface ApiResponse {
  data: Theme[];
}

export const useGetThemes = () => {
  const { data } = useSuspenseQueryApi<ApiResponse>(['themes'], '/themes');
  return { themes: data.data };
};
