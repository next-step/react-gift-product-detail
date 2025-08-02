import type { ThemeInfo } from '@/type/GiftAPI/theme';
import { getThemesInfoUrl } from '@/utils/getApiUrl';
import { getFromUrl } from '@/utils/getFromUrl';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';


function useThemesData(){
    const { themeId } = useParams<{ themeId: string }>();

  const themesInfoUrl = getThemesInfoUrl(themeId);
  const { data } = useQuery<ThemeInfo>({
    queryKey : ['ThemeInfo'],
    queryFn : () => getFromUrl(themesInfoUrl)

  })
  const themeBackground = (data?.backgroundColor ?? 'white')
  const themeName = data?.name
  const themeTitle = data?.title
  const themeDescription = data?.description

  return({
    themeBackground,
    themeName,
    themeTitle,
    themeDescription
  })
}

export default useThemesData
