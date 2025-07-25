import { useParams } from "react-router-dom";
import { useProductDetail } from "@/hooks/useProductDetail";
import ProductAnnouncement from "@/pages/product/components/ProductAnnouncement";

const ProductAnnouncementSection = () => {
  const { productId } = useParams();
  const { detail } = useProductDetail(Number(productId));

  return <ProductAnnouncement announcements={detail.announcements} />;
};

export default ProductAnnouncementSection;
