import styled from '@emotion/styled';
import useThemeInfo from '@/hooks/useThemeInfo';

const HeroWrapper = styled.section<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  color: #fff;
  padding: 26px 16px 22px;
  gap: 4px;
`;

const HeroName = styled.h1`
  ${({ theme }) => theme.typography.label1Bold};
  margin-bottom: 8px;
`;

const HeroTitle = styled.h1`
  ${({ theme }) => theme.typography.title1Bold};
`;

const HeroDescription = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  margin-top: 4px;
`;

interface ThemeHeroProps {
  themeId: number;
}

export default function ThemeHero({ themeId }: ThemeHeroProps) {
  const { data: themeInfo } = useThemeInfo(themeId);

  if (!themeInfo) return null;

  return (
    <HeroWrapper bg={themeInfo.backgroundColor}>
      <HeroName>{themeInfo.name}</HeroName>
      <HeroTitle>{themeInfo.title}</HeroTitle>
      <HeroDescription>{themeInfo.description}</HeroDescription>
    </HeroWrapper>
  );
}
