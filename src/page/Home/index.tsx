import FriendSelectionSection from './components/FriendSelectionSection';
import GiftThemeSection from './components/GiftThemeSection';
import CommentBoxSection from './components/CommentBoxSection';
import GiftRankingSection from './components/GiftRankingSection';
import ErrorBoundary from '@/components/ErrorBoundary';

const HOME = () => {
  return (
    <ErrorBoundary fallback={<h2>페이지 로딩 중 에러가 발생했습니다</h2>}>
      <FriendSelectionSection />
      <GiftThemeSection />
      <CommentBoxSection />
      <GiftRankingSection />
    </ErrorBoundary>
  );
};

export default HOME;
