import { useState } from "react";
import ProductTab from "@/pages/product/components/ProductTab";
import ProductDetailSection from "@/pages/product/section/ProductDetailSection";
import ProductReviewSection from "@/pages/product/section/ProductReviewSection";
import ProductAnnouncementSection from "./ProductAnnouncementSection";

export type TabType = "description" | "review" | "announcement";

const ProductTabSection = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>("description");

  return (
    <>
      <ProductTab selected={selectedTab} onChange={setSelectedTab} />

      {selectedTab === "description" && <ProductDetailSection />}
      {selectedTab === "review" && <ProductReviewSection />}
      {selectedTab === "announcement" && <ProductAnnouncementSection />}
    </>
  );
};

export default ProductTabSection;
