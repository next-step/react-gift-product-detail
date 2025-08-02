import ProductList from '@/component/theme/ProductList';
import useThemesData from '@/hook/theme/useThemesData';
import { DefaultDiv, Gap } from '@/styles/CommomStyle/Common.styled';
import { ThemeDescription, ThemeName, ThemeTitle, ThemeTop } from '@/styles/CommomStyle/themes.styled';



const Themes = () => {
  const {themeBackground, themeName, themeTitle, themeDescription} = useThemesData();

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