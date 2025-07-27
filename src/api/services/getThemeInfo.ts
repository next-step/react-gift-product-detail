import publicClient from '../clients/publicClient';

type ThemeInfo = {
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
};

interface GetThemeInfo {
  queryKey: [string, { id: number }];
}

export const getThemeInfo = async ({ queryKey }: GetThemeInfo): Promise<ThemeInfo> => {
  const { id } = queryKey[1];
  const response = await publicClient.get(`/api/themes/${id}/info`);
  const { data } = response.data;

  return data;
};
