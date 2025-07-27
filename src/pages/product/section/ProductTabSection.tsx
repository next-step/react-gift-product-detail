import { Suspense, useState } from "react";
import ProductTab from "@/pages/product/components/ProductTab";
import ProductDetailSection from "@/pages/product/section/ProductDetailSection";
import ProductReviewSection from "@/pages/product/section/ProductReviewSection";
import ProductAnnouncementSection from "./ProductAnnouncementSection";
import type { TabType } from "@/constants/product";
import { Spinner } from "@/components/common/Spinner";

const ProductTabSection = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("description");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "description":
        return <ProductDetailSection />;
      case "review":
        return <ProductReviewSection />;
      case "announcement":
        return <ProductAnnouncementSection />;
      default:
        return null;
    }
  };

  return (
    <>
      <ProductTab selected={selectedTab} onChange={setSelectedTab} />
      <Suspense fallback={<Spinner />}>{renderTabContent()}</Suspense>
    </>
  );
};

export default ProductTabSection;
