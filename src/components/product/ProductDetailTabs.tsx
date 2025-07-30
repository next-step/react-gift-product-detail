import { useState } from 'react';
import { css } from '@emotion/react';
import { palette, spacing, typography } from '@/styles/theme';
import type { ProductDetail, ProductReview } from '@/types';
import styled from '@emotion/styled';

interface Props {
  detail: ProductDetail;
  reviews: {
    totalCount: number;
    reviews: ProductReview[];
  };
}

type Tab = 'description' | 'reviews' | 'details';

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: ${spacing.spacing4} 0;
  font-size: ${typography.body1Regular.fontSize};
  font-weight: 700;
  color: ${(props) => (props.isActive ? palette.gray900 : palette.gray600)};
  border-bottom: 2px solid ${(props) => (props.isActive ? palette.gray900 : 'transparent')};
  transition: all 0.2s;
`;

export const ProductDetailTabs = ({ detail, reviews }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('description');

  return (
    <div>
      <div css={tabNav}>
        <TabButton
          onClick={() => setActiveTab('description')}
          isActive={activeTab === 'description'}
        >
          상품설명
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('reviews')}
          isActive={activeTab === 'reviews'}
        >
          선물후기 ({reviews.totalCount})
        </TabButton>
        <TabButton
          onClick={() => setActiveTab('details')}
          isActive={activeTab === 'details'}
        >
          상세정보
        </TabButton>
      </div>
      <div css={tabContent}>
        {activeTab === 'description' && (
          <div dangerouslySetInnerHTML={{ __html: detail.description }} />
        )}
        {activeTab === 'reviews' && (
          <div>
            {reviews.reviews.length > 0 ? (
              reviews.reviews.map(review => (
                <div key={review.id} css={reviewItem}>
                  <strong>{review.authorName}</strong>
                  <p>{review.content}</p>
                </div>
              ))
            ) : (
              <div>등록된 선물후기가 없습니다.</div>
            )}
          </div>
        )}
        {activeTab === 'details' && (
          <div>
            {detail.announcement.map(item => (
              <div key={item.name} css={detailItem}>
                <strong>{item.name}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
 
const tabNav = css`
  display: flex;
  border-bottom: 1px solid ${palette.gray200};
`;

const tabContent = css`
  padding: ${spacing.spacing6} ${spacing.spacing4};
  font-size: 14px;
  line-height: 1.6;

  img { max-width: 100%; }
  p { margin-bottom: 1em; }
`;

const reviewItem = css`
  padding-bottom: ${spacing.spacing4};
  margin-bottom: ${spacing.spacing4};
  border-bottom: 1px solid ${palette.gray100};

  strong {
    font-weight: 700;
    font-size: 14px;
  }
  p {
    margin-top: ${spacing.spacing1};
    color: ${palette.gray800};
  }

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const detailItem = css`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: ${spacing.spacing3} 0;

  strong {
    color: ${palette.gray800};
    font-weight: normal;
  }
  span {
    color: ${palette.gray700};
  }
`;
