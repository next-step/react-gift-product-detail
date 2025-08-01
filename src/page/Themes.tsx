
import {
} from '@/component/main/GiftRanking.styled';
import ProductList from '@/component/theme/ProductList';

import { getThemesInfoUrl } from '@/constant/api';

import { DefaultDiv, Gap } from '@/styles/CommomStyle/Common.styled';
import { ThemeDescription, ThemeName, ThemeTitle, ThemeTop } from '@/styles/CommomStyle/themes.styled';
import type { ThemeInfo } from '@/type/GiftAPI/theme';
import { getFromUrl } from '@/utils/getFromUrl';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';


const Themes = () => {
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