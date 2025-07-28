import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import { useProductDetailContent } from "@/hooks/useProductDetailContent";
import { useState } from "react";
import { useProductReview } from "@/hooks/useProductReview";

export default function DetailCard({ productId }: { productId: string }) {
  const [selectedTab, setSelectedTab] = useState<"desc" | "review" | "info">(
    "desc",
  );
  const { data: reviews } = useProductReview(productId);
  const { data: detail } = useProductDetailContent(productId);

  if (!detail) return <div>상세 정보 에러 발생</div>;

  return (
    <DetailWrapper>
      <Detail>
        <DetailCategory>
          <DetailButton
            onClick={() => setSelectedTab("desc")}
            isActive={selectedTab === "desc"}
          >
            <CategoryName isActive={selectedTab === "desc"}>
              상품설명
            </CategoryName>
            {selectedTab === "desc" && <CategoryUnderbar />}
          </DetailButton>
          <DetailButton
            onClick={() => setSelectedTab("review")}
            isActive={selectedTab === "review"}
          >
            <CategoryName isActive={selectedTab === "review"}>
              선물후기
            </CategoryName>
            {selectedTab === "review" && <CategoryUnderbar />}
          </DetailButton>
          <DetailButton
            onClick={() => setSelectedTab("info")}
            isActive={selectedTab === "info"}
          >
            <CategoryName isActive={selectedTab === "info"}>
              상세정보
            </CategoryName>
            {selectedTab === "info" && <CategoryUnderbar />}
          </DetailButton>
        </DetailCategory>
        <DetailContainer>
          <DetailContent>
            <ContentWrapper>
              {selectedTab === "desc" && (
                <Content
                  dangerouslySetInnerHTML={{
                    __html: detail?.description ?? "",
                  }}
                />
              )}

              {selectedTab === "review" && (
                <Content>
                  {reviews?.reviews?.length ? (
                    reviews.reviews.map((review) => (
                      <div key={review.id}>
                        <Spacing height="16px" />
                        <CategoryId>{review.authorName}</CategoryId>
                        <Spacing height="8px" />
                        <CategoryContent>{review.content}</CategoryContent>
                        <Spacing height="8px" />
                      </div>
                    ))
                  ) : (
                    <p>후기가 없습니다.</p>
                  )}
                </Content>
              )}

              {selectedTab === "info" && (
                <Content>
                  {detail.announcements.map((item) => (
                    <div key={item.displayOrder}>
                      <Spacing height="16px" />
                      <CategoryId>{item.name}</CategoryId>
                      <Spacing height="8px" />
                      <CategoryContent>{item.value}</CategoryContent>
                      <Spacing height="8px" />
                    </div>
                  ))}
                </Content>
              )}

              <Spacing height="64px" />
            </ContentWrapper>
          </DetailContent>
        </DetailContainer>
      </Detail>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray.white};
`;

const Detail = styled.div`
  width: 100%;
`;

const DetailCategory = styled.div`
  display: flex;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const DetailButton = styled.button<{ isActive: boolean }>`
  position: relative;
  padding: 16px 20px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 1;
  transition: 0.2s;
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  ${({ isActive, theme }) =>
    !isActive &&
    `
    &:hover {
      background-color: ${theme.colors.gray[100]};
    }
  `}
`;

const CategoryName = styled.p<{ isActive: boolean }>`
  ${({ theme }) => theme.typography.subtitle1Regular};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray[900] : theme.colors.gray[600]};
  margin: 0px;
  text-align: left;
`;

const CategoryUnderbar = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0px;
  right: 0px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.gray[900]};
`;

const DetailContainer = styled.div`
  min-height: 400px;
`;

const DetailContent = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const Content = styled.div`
  white-space: pre-wrap;
  max-width: 100%;
  width: 100%;
  overflow-y: hidden;
  ${({ theme }) => theme.typography.body1Regular};
  img {
    width: 100%;
    display: block;
    height: auto;
  }
`;

const CategoryId = styled.p`
  ${({ theme }) => theme.typography.body2Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;

const CategoryContent = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;
