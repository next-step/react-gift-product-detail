
import { css } from '@emotion/react';
import { useThemeInfoQuery } from '@/hooks/useCategoryQuery';

interface ThemeHeroSectionProps {
  themeId: number;
}

const sectionStyle = (backgroundColor: string) => css({
  background: backgroundColor,
  padding: '32px 16px',
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
});

const h2Style = css({
  fontWeight: 700,
  fontSize: 28,
  color: 'white',
  marginBottom: 8,
});

const h1Style = css({
  fontWeight: 700,
  fontSize: 32,
  color: 'white',
  marginBottom: 8,
});

const descStyle = css({
  color: '#b0b8c1',
  maxWidth: 600,
});

const ThemeHeroSection = ({ themeId }: ThemeHeroSectionProps) => {
  const { data: themeInfo } = useThemeInfoQuery(themeId);
  if (!themeInfo) return null;
  return (
    <section css={sectionStyle(themeInfo.backgroundColor)}>
      <h2 css={h2Style}>{themeInfo.name}</h2>
      <h1 css={h1Style}>{themeInfo.title}</h1>
      <p css={descStyle}>{themeInfo.description}</p>
    </section>
  );
};

export default ThemeHeroSection;
