/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styled from "@emotion/styled";
import { useProductDetail } from "@/hooks/queries/useProductDetail";
import { useProductReview } from "@/hooks/queries/useProductReview";

interface Props {
  productId: number;
}

const TABS = ["상품설명", "선물후기", "상세정보"] as const;

export const DetailTab = ({ productId }: Props) => {
  const [selectedTab, setSelectedTab] = useState<(typeof TABS)[number]>("상품설명");

  const { data: detail } = useProductDetail(productId);
  const { data: reviewData } = useProductReview(productId);

  if (!detail) return null;

  return (
    <Wrapper>
      <TabHeader>
        {TABS.map((tab) => (
          <TabButton
            key={tab}
            isActive={selectedTab === tab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </TabHeader>

      <TabContent>
        {selectedTab === "상품설명" && (
          // HTML 형태로 전달되는 상품 설명을 그대로 렌더링하고
          // 서버에서 내려온 콘텐츠는 신뢰된 데이터로 간주!!
          <Description
            dangerouslySetInnerHTML={{
              __html: detail.description ?? "상품 설명이 없습니다.",
            }}
          />
        )}

        {selectedTab === "선물후기" && (
          reviewData?.reviews?.length ? (
            <InfoList>
              {reviewData.reviews.map((review) => (
                <li key={review.id}>
                  <strong>{review.authorName}</strong>
                  <div>{review.content}</div>
                </li>
              ))}
            </InfoList>
          ) : (
            <Placeholder>아직 등록된 후기가 없습니다.</Placeholder>
          )
        )}

        {selectedTab === "상세정보" && (
          detail.announcements.length > 0 ? (
            <InfoList>
              {detail.announcements.map((info) => (
                <li key={info.name}>
                  <strong>{info.name}</strong>
                  <div>{info.value}</div>
                </li>
              ))}
            </InfoList>
          ) : (
            <Placeholder>상세 정보가 없습니다.</Placeholder>
          )
        )}
      </TabContent>
    </Wrapper>
  );
};

// --- 스타일 ---
const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spacing.spacing6};
`;

const TabHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing3};
  background: none;
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ isActive, theme }) =>
    isActive ? theme.typography.body1Bold.fontWeight : theme.typography.body1Regular.fontWeight};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.textDefault : theme.colors.textSub};
  border-bottom: 2px solid
    ${({ isActive, theme }) => (isActive ? theme.colors.textDefault : "transparent")};
  cursor: pointer;
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
`;

const Description = styled.div`
  line-height: 1.6;

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.spacing3};
    word-break: break-word;
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  line-height: 1.8;

  li {
    margin-bottom: ${({ theme }) => theme.spacing.spacing3};
  }

  strong {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.spacing1};
    color: ${({ theme }) => theme.colors.textDefault};
    font-size: ${({ theme }) => theme.typography.subtitle2Bold.fontSize};
    font-weight: ${({ theme }) => theme.typography.subtitle2Bold.fontWeight};
  }

  div {
    color: ${({ theme }) => theme.colors.textDefault};
    font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
    white-space: pre-line;
  }
`;

const Placeholder = styled.div`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
`;
