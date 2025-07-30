import { css } from '@emotion/react';
import { useParams} from 'react-router-dom';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import GlobalStyle from '@/styles/GlobalStyle';
import Header from '@/components/Header';
import { useThemeInfoQuery } from '@/hooks/useCategoryQuery';
import ThemeProductGrid from '@/components/ThemeProductGrid';

const heroStyle = (backgroundColor: string) => css({
  background: backgroundColor,
  padding: `${spacing.spacing8} ${spacing.spacing4}`,
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
});

const heroTitleStyle = css({
  ...typography.title1Bold,
  color: 'white',
  marginBottom: spacing.spacing1,
});

const heroDescriptionStyle = css({
  ...typography.body1Regular,
  color: colors.textSub,
  maxWidth: '600px',
});

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const { data: themeInfo } = useThemeInfoQuery(Number(themeId));

  if (!themeInfo) return null; // 데이터가 없으면 아무것도 렌더링하지 않음

  return (
    <div>
      <GlobalStyle />
      <Header />
      <section css={heroStyle(themeInfo.backgroundColor)}>
        <h2 css={heroTitleStyle}>{themeInfo.name}</h2>
        <h1 css={heroTitleStyle}>{themeInfo.title}</h1>
        <p css={heroDescriptionStyle}>{themeInfo.description}</p>
      </section>
      <ThemeProductGrid themeId={Number(themeId)} />
    </div>
  );
};

export default ThemeProductsPage;