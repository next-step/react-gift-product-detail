import { useParams } from 'react-router';
import PageContainer from '@/components/PageContainer';
import ThemeHeroSection from '@/sections/ThemeSection/ThemeHeroSection';
import ThemeProductSection from '@/sections/ThemeSection/ThemeProductSection';
import { useThemeInfoQuery } from '@/queries/useThemesQuery';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';
import CustomErrorBoundary from '@/components/CustomErrorBoundary';

function ThemeInfoSection({ themeId }: { themeId: string }) {
  const { data } = useThemeInfoQuery(themeId);
  return <ThemeHeroSection {...data} />;
}

export default function ThemePage() {
  const { themeId } = useParams();

  if (!themeId) return null;

  return (
    <PageContainer>
      <CustomErrorBoundary fallback={null}>
        <Suspense fallback={<Spinner />}>
          <ThemeInfoSection themeId={themeId} />
        </Suspense>
      </CustomErrorBoundary>
      <CustomErrorBoundary fallback={<p>상품 목록을 불러오지 못했습니다.</p>}>
        <Suspense fallback={<Spinner />}>
          <ThemeProductSection themeId={themeId} />
        </Suspense>
      </CustomErrorBoundary>
    </PageContainer>
  );
}
