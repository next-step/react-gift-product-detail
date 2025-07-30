import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { AdListSection } from './components/AdListSection';
import { ProductRankingListSection } from './components/ProductRankingListSection';
import { SelectFriendSection } from './components/SelectFriendSection';
import { SelectThemeSection } from './components/SelectThemeSection';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const HomePage = () => {
  return (
    <main>
      <SelectFriendSection />
      <HorizontalSpacing size='spacing6' />
      <ErrorBoundary>
        <SelectThemeSection />
      </ErrorBoundary>
      <HorizontalSpacing size='spacing6' />
      <AdListSection />
      <HorizontalSpacing size='spacing10' />
      <ProductRankingListSection />
      <HorizontalSpacing size='spacing10' />
    </main>
  );
};

export default HomePage;
