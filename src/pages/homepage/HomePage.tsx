import React, { Suspense } from "react";
import AddFriend from "@/pages/homepage/OtherSection/AddFriend";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import CategorySection from "@/pages/homepage/CategorySection/CategorySection";
import Fighting from "@/pages/homepage/OtherSection/Fighting";
import RisingSection from "@/pages/homepage/RisingSection/RisingSection";

const HomePage = () => {
  return (
    <>
      <AddFriend />
      <Suspense fallback={<LoadingSpinner />}>
        <CategorySection />
      </Suspense>
      <Fighting />
      <RisingSection />
    </>
  );
};

export default HomePage;
