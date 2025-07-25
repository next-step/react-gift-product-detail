import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getThemeInfo } from '@/entities/theme/api/themeApi';
import type { ThemeInfo } from '@/entities/theme/model/types';
import { Loading } from '@/shared/ui';
import * as S from './styles';
import { QUERY_KEYS } from '@/shared/config/queryKeys';

interface ThemeHeroSectionProps {
  themeId?: number;
}

const ThemeHeroSection = ({ themeId }: ThemeHeroSectionProps) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<ThemeInfo>({
    queryKey: QUERY_KEYS.THEME_INFO(themeId!),
    queryFn: () => getThemeInfo(themeId!),
    enabled: !!themeId,
    retry: false,
  });

  //공식문서에서 API요청만 Tanstack Query로 처리하고 useEffect로 UI 처리하는 것을 권장하는듯해 이렇게 작성했습니다.
  useEffect(() => {
    if (isError) {
      navigate('/', { replace: true });
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <S.ThemeHeroContainer>
        <Loading height="80px" message="테마 정보를 불러오는 중..." />
      </S.ThemeHeroContainer>
    );
  }

  if (!data) return null;

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
