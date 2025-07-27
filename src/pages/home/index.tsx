import { FriendBanner } from "@/pages/home/components/FriendBanner";
import { CategorySection } from "@/pages/home/components/CategorySection";
import { KakaoTechCampusBanner } from "@/pages/home/components/KakaoTechCampusBanner";
import { RankingSection } from "@/pages/home/components/RankingSection";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Suspense } from "react";
import { Spinner } from "@/components/common/Spinner";

export default function HomePage() {
  return (
    <>
      <FriendBanner />
      <ErrorBoundary fallback={<p>~문제가 발생했습니다~</p>}>
        <Suspense fallback={<Spinner />}>
          <CategorySection />
        </Suspense>
      </ErrorBoundary>

      <KakaoTechCampusBanner />

      <ErrorBoundary fallback={<p>~문제가 발생했습니다~</p>}>
        <Suspense fallback={<Spinner />}>
          <RankingSection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
