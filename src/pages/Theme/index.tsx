import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeHeroSection, ThemeProductSection } from '@/features/themeCatalog';
import { ErrorBoundary, Loading, RedirectOnError } from '@/shared/ui';
import { ROUTES } from '@/shared/config';
import * as S from './styles';

const Theme = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const numericThemeId = themeId ? parseInt(themeId, 10) : undefined;

  if (!numericThemeId) {
    return null;
  }

  return (
    <S.Container>
      <ErrorBoundary fallback={<RedirectOnError to={`/${ROUTES.HOME}`} />}>
        <Suspense fallback={<Loading height="200px"/>}>
          <ThemeHeroSection themeId={numericThemeId} />
          <ThemeProductSection themeId={numericThemeId} />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
};

export default Theme; 