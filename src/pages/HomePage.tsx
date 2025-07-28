import Category from "@/components/home/Category";
import Friends from "@/components/home/Friends";
import Banner from "@/components/home/Banner";
import TimeRanking from "@/components/home/TimeRanking";
import { Suspense } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";

function HomePageContent() {
  return (
    <>
      <Friends />
      <Category />
      <Banner />
      <TimeRanking />
    </>
  );
}

function HomePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner message="홈페이지를 불러오는 중..." />}>
        <HomePageContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default HomePage;
