import ThemeItemCard  from '@/entities/theme/ui/ThemeItemCard';
import * as S from './styles';
import { getThemes } from '@/entities/theme/api/themeApi';
import { useEffect } from 'react';
import { type Theme } from '@/entities/theme/model/types';
import { useFetchState } from '@/shared/lib/hooks';
import { Loading, ErrorMessage } from '@/shared/ui';

const ThemeField = () => {
  const { fetchState, setLoading, setSuccess, setError } = useFetchState<Theme[]>([], true);
  
  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const data = await getThemes();
        setSuccess(data);
      } catch {
        setError();
      } finally {
        setLoading(false);
      }
    };
    
    fetchThemes();
  }, []);

  return (
    <S.Container>
      <S.Title>선물 테마</S.Title>
      {fetchState.isLoading ? (
        <Loading height="200px" />  
      ) : fetchState.isError ? (
        <ErrorMessage height="200px" />
      ) : (
        <S.Grid>
          {fetchState.data.map((theme) => (
            <ThemeItemCard
              key={theme.themeId}
              themeId={theme.themeId}
              imageUrl={theme.image}
              title={theme.name}
            />
          ))}
        </S.Grid>
      )}
    </S.Container>
  );
};

export default ThemeField; 