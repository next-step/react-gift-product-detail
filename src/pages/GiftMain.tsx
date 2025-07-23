import { PageLayout } from "@/components/layout/PageLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Navigation } from "@/components/header/Navigation";
import { CategorySection } from "@/components/category/CategorySection";
import { FriendBanner } from "@/components/banner/FriendBanner";
import { MessageBanner } from "@/components/banner/MessageBanner";
import { RankingSection } from "@/components/ranking/RankingSection";
import AsyncBoundary from "@/components/common/AsyncBoundary";

const GiftMain = () => {
  return (
    <PageLayout>
      <PageContainer>
        <Navigation />
        <FriendBanner />
        <AsyncBoundary>
          <CategorySection />
        </AsyncBoundary>
        <MessageBanner />
        <RankingSection />
      </PageContainer>
    </PageLayout>
  );
};
export default GiftMain;
