import { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/Router';

import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import Loading from '@/components/Loading/Loading';
import ThemePageContent from '@/features/Theme/components/ThemePageContent/ThemePageContent';

const ThemePage = () => {
  const navigate = useNavigate();
  const { themeId } = useParams<{ themeId: string }>();

  const themeIdNum =
    themeId && !isNaN(Number(themeId)) ? Number(themeId) : null;

  if (!themeIdNum) {
    navigate(ROUTE_PATH.GIFT, { replace: true });
    return null;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ThemePageContent themeIdNum={themeIdNum} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ThemePage;
