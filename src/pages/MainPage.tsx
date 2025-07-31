import CategorySection from '@/components/main/CategorySection';
import FriendSelection from '@/components/main/FriendSelection';
import DisplaySection from '@/components/main/DisplaySection';
import RankingSection from '@/components/main/RankingSection';
import Spinner from '@/components/common/Spinner';
import { Suspense } from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import PageErrorFallback from '@/components/common/PageErrorFallback';
import ComponentFallback from '@/components/common/ComponentFallback';

const MainPageContent = () => {
  return (
    <>
      <FriendSelection />

      <ErrorBoundary fallback={<ComponentFallback />}>
        <Suspense fallback={<Spinner />}>
          <CategorySection />
        </Suspense>
      </ErrorBoundary>

      <DisplaySection />

      <ErrorBoundary fallback={<ComponentFallback />}>
        <Suspense fallback={<Spinner />}>
          <RankingSection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

const MainPage = () => {
  return (
    <ErrorBoundary fallback={<PageErrorFallback />}>
      <Suspense fallback={<ComponentFallback />}>
        <MainPageContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MainPage;
