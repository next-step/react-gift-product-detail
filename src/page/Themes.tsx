
import {
} from '@/component/main/GiftRanking.styled';
import ProductList from '@/component/theme/ProductList';
import { baseUrl } from '@/constant/api';
import useFetchFromUrlT from '@/hook/useFetchFromUrlT';
import { DefaultDiv, Gap } from '@/styles/CommomStyle/Common.styled';
import { ThemeDescription, ThemeName, ThemeTitle, ThemeTop } from '@/styles/CommomStyle/themes.styled';
import { type ApiResponse } from '@/type/GiftAPI/product';
import type { ThemeInfo } from '@/type/GiftAPI/theme';
import { getFromUrl } from '@/utils/getFromUrl';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
//import useFetchFromUrlT from '@/hook/useFetchFromUrlT';



const Themes = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const themesUrl = `${baseUrl}/api/themes/${themeId}/info`
  //const themeInfo = useFetchFromUrlT<ThemeInfo>(themesUrl, getFromUrl, defaultThemeInfo);
  const { data } = useQuery<ThemeInfo>({
    queryKey : ['ThemeInfo'],
    queryFn : () => getFromUrl(themesUrl)
  })
  const themeBackground = (data?.backgroundColor ?? 'white')
  const themeName = data?.name
  const themeTitle = data?.title
  const themeDescription = data?.description


  return (
    <DefaultDiv>
      <ThemeTop background={themeBackground}>
        <ThemeName> {themeName} </ThemeName>
        <Gap height={8} />
        <ThemeTitle>{themeTitle}</ThemeTitle>
        <Gap height={4} />
        <ThemeDescription>{themeDescription}</ThemeDescription>
      </ThemeTop>
      <ProductList />
    </DefaultDiv>

  )
};
export default Themes;