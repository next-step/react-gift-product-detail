import ThemeItemCard  from '@/entities/theme/ui/ThemeItemCard';
import * as S from './styles';
import { getThemes } from '@/entities/theme/api/themeApi';
import { Loading, ErrorMessage } from '@/shared/ui';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/shared/config/queryKeys';

const ThemeField = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.THEMES,
    queryFn: getThemes,
  });

  //JSX에서 처리하지않고 early return으로 처리로 변경
  if (isLoading) { 
    return <Loading height="200px" />;
  }
  if (isError) {
    return <ErrorMessage height="200px" />;
  }

  return (
    <S.Container>
      <S.Title>선물 테마</S.Title>
        <S.Grid>
          {data?.map((theme) => (
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