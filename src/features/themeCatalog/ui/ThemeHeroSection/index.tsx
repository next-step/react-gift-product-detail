import { useSuspenseQuery } from '@tanstack/react-query';
import { getThemeInfo } from '@/entities/theme/api/themeApi';
import type { ThemeInfo } from '@/entities/theme/model/types';
import * as S from './styles';
import { QUERY_KEYS } from '@/shared/config/queryKeys';

interface ThemeHeroSectionProps {
  themeId?: number;
}

const ThemeHeroSection = ({ themeId }: ThemeHeroSectionProps) => {
  if (!themeId) {
    return null;
  }

  const { data } = useSuspenseQuery<ThemeInfo>({
    queryKey: QUERY_KEYS.THEME_INFO(themeId),
    queryFn: () => getThemeInfo(themeId),
    retry: false,
  });

  return (
    <>
      <S.ThemeHeroContainer backgroundColor={data.backgroundColor}>
        <S.ThemeName>{data.name}</S.ThemeName>
        <S.ThemeTitle>{data.title}</S.ThemeTitle>
        <S.ThemeDescription>{data.description}</S.ThemeDescription>
      </S.ThemeHeroContainer>
    </>
  );
};

export default ThemeHeroSection;
