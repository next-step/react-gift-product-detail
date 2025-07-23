import { PageLayout } from "@/components/layout/PageLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Navigation } from "@/components/header/Navigation";
import { CategorySection } from "@/components/category/CategorySection";
import { FriendBanner } from "@/components/banner/FriendBanner";
import { MessageBanner } from "@/components/banner/MessageBanner";
import { RankingSection } from "@/components/ranking/RankingSection";
import { Suspense } from "react";
import { Spinner } from "@/components/common/Spinner";
import ErrorBoundary from "@/components/common/ErrorBoundary";

const GiftMain = () => {
  return (
    <PageLayout>
      <PageContainer>
        <Navigation />
        <FriendBanner />
        <Suspense fallback={<Spinner size={48} withWrapper />}>
          <ErrorBoundary>
            <CategorySection />
          </ErrorBoundary>
        </Suspense>
        <MessageBanner />
        <RankingSection />
      </PageContainer>
    </PageLayout>
  );
};
export default GiftMain;
