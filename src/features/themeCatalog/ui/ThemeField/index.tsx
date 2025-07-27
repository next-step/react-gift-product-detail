import ThemeItemCard  from '@/entities/theme/ui/ThemeItemCard';
import * as S from './styles';
import { getThemes } from '@/entities/theme/api/themeApi';
import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/config/queryKeys';

const ThemeField = () => {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEYS.THEMES,
    queryFn: getThemes,
  });

  return (
    <S.Container>
      <S.Title>선물 테마</S.Title>
        <S.Grid>
          {data.map((theme) => (
            <ThemeItemCard
              key={theme.themeId}
              themeId={theme.themeId}
              imageUrl={theme.image}
              title={theme.name}
            />
        ))}
      </S.Grid>
    </S.Container>
  );
};

export default ThemeField; 