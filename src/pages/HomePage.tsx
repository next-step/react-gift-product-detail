import Category from "@/components/home/Category";
import Friends from "@/components/home/Friends";
import Banner from "@/components/home/Banner";
import TimeRanking from "@/components/home/TimeRanking";
import { withAsyncBoundary } from "@/hoc/withAsyncBoundary";

function HomePage() {
  return (
    <>
      <Friends />
      <Category />
      <Banner />
      <TimeRanking />
    </>
  );
}

export default withAsyncBoundary(HomePage);
