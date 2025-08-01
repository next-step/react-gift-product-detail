import type {
  ProductDetail,
  ProductReview,
  ProductReviewItem,
  AnnouncementItem,
} from "@/types/DTO/productDTO";
import {
  TabWrapper,
  TabButton,
  Content,
  HtmlContentWrapper,
} from "@/pages/DetailPage/components/ProductTabSection/ProductTabSection.style";

interface ProductTabsProps {
  activeTab: "description" | "review" | "info";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"description" | "review" | "info">
  >;
  detailInfo?: ProductDetail;
  reviewData?: ProductReview;
  isReviewLoading?: boolean;
  isReviewError?: boolean;
}

const ProductTabs = ({
  activeTab,
  setActiveTab,
  detailInfo,
  reviewData,
  isReviewLoading,
  isReviewError,
}: ProductTabsProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <HtmlContentWrapper
            dangerouslySetInnerHTML={{ __html: detailInfo?.description ?? "" }}
          />
        );
      case "review":
        if (isReviewLoading) return <div>리뷰 로딩 중...</div>;
        if (isReviewError) return <div>리뷰를 불러오지 못했습니다.</div>;
        if (!reviewData || reviewData.reviews.length === 0)
          return <div>리뷰가 없습니다.</div>;

        return (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {reviewData.reviews.map(
              (review: ProductReviewItem, idx: number) => {
                const isLast = idx === reviewData.reviews.length - 1;
                return (
                  <li
                    key={review.id}
                    style={{
                      padding: "12px",
                      marginBottom: isLast ? "24px" : "8px",
                    }}
                  >
                    <strong
                      style={{
                        fontWeight: "bold",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      {review.authorName}
                    </strong>
                    <p style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                      {review.content}
                    </p>
                  </li>
                );
              }
            )}
          </ul>
        );

      case "info":
        if (
          !detailInfo ||
          !detailInfo.announcements ||
          detailInfo.announcements.length === 0
        )
          return <div>상세정보가 없습니다.</div>;

        return (
          <div style={{ padding: "16px", lineHeight: "1.6" }}>
            {detailInfo.announcements
              .sort(
                (a: AnnouncementItem, b: AnnouncementItem) =>
                  a.displayOrder - b.displayOrder
              )
              .map(({ name, value }: AnnouncementItem) => (
                <div key={name} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      lineHeight: "1.5",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <TabWrapper>
        <TabButton
          onClick={() => setActiveTab("description")}
          active={activeTab === "description"}
        >
          상품설명
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("review")}
          active={activeTab === "review"}
        >
          선물후기
        </TabButton>
        <TabButton
          onClick={() => setActiveTab("info")}
          active={activeTab === "info"}
        >
          상세정보
        </TabButton>
      </TabWrapper>
      <Content>{renderContent()}</Content>
    </>
  );
};

export default ProductTabs;
