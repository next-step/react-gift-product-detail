import { useQueryApi } from '@/apis/useQueryApi';

export interface Theme {
  themeId: number;
  name: string;
  image: string;
}

interface ApiResponse {
  data: Theme[];
}

export const useGetThemes = () => {
  const { data } = useQueryApi<ApiResponse>(['themes'], '/themes', {
    suspense: true,
  });
  return { themes: data?.data || [] };
};
