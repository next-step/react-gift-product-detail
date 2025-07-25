import { useParams } from 'react-router';
import PageContainer from '@/components/PageContainer';
import ThemeHeroSection from '@/sections/ThemeSection/ThemeHeroSection';
import ThemeProductSection from '@/sections/ThemeSection/ThemeProductSection';
import { useThemeInfoQuery } from '../hooks/useThemeInfoQuery';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import Spinner from '../components/Spinner';

function ThemeInfoSection({ themeId }: { themeId: string }) {
  const { data } = useThemeInfoQuery(themeId);
  return (
    <ThemeHeroSection
      name={data.name}
      title={data.title}
      description={data.description}
      backgroundColor={data.backgroundColor}
    />
  );
}

export default function ThemePage() {
  const { themeId } = useParams();

  if (!themeId) return null;

  return (
    <PageContainer>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={() => null}>
            <Suspense fallback={<Spinner />}>
              <ThemeInfoSection themeId={themeId} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={() => null}>
            <Suspense fallback={<Spinner />}>
              <ThemeProductSection themeId={themeId} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </PageContainer>
  );
}
