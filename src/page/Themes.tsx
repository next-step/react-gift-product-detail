
import {
} from '@/component/main/GiftRanking.styled';
import ProductList from '@/component/theme/ProductList';
import { BaseUrl } from '@/constant/api';
import useFetchFromUrlT from '@/hook/useFetchFromUrlT';
import { DefaultDiv, Gap } from '@/styles/CommomStyle/Common.styled';
import { ThemeDescription, ThemeName, ThemeTitle, ThemeTop } from '@/styles/CommomStyle/themes.styled';
import { defaultThemeInfo, type ThemeInfo } from '@/type/GiftAPI/product';
import { getFromUrl } from '@/utils/getFromUrl';
import { useParams } from 'react-router-dom';
//import useFetchFromUrlT from '@/hook/useFetchFromUrlT';



const Themes = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const themesUrl = `${BaseUrl}/api/themes/${themeId}/info`
  const themeInfo = useFetchFromUrlT<ThemeInfo>(themesUrl, getFromUrl, defaultThemeInfo);

  const themeBackground = (themeInfo.item?.backgroundColor ?? 'white')
  const themeName = themeInfo.item?.name
  const themeTitle = themeInfo.item?.title
  const themeDescription = themeInfo.item?.description


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