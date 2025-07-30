import { FriendSelector } from '@/features/friendSelection';
import { ThemeSection } from '@/widgets/themeSection';
import { RankingSection } from '@/features/productRanking/ui';
import { ErrorBoundary, Loading, ErrorMessage } from '@/shared/ui';
import { Suspense } from 'react';

const Home = () => (
  <>
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Suspense fallback={<Loading height="200px" />}>
        <FriendSelector />
        <ThemeSection />
        <RankingSection />
      </Suspense>
    </ErrorBoundary>
  </>
);

export default Home;
