import { css } from '@emotion/react';
import { palette, spacing } from '@/styles/theme';
import type { ProductDetail, ProductReview } from '@/types';

interface TabContentProps {
  activeTab: 'description' | 'reviews' | 'details';
  detail: ProductDetail;
  reviews: {
    totalCount: number;
    reviews: ProductReview[];
  };
}

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

export const TabContent = ({ activeTab, detail, reviews }: TabContentProps) => {
  switch (activeTab) {
    case 'reviews':
      return (
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
      );
    case 'details':
      return (
        <div>
          {detail.announcement.map(item => (
            <div key={item.name} css={detailItem}>
              <strong>{item.name}</strong>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      );
    case 'description':
    default:
      return <div dangerouslySetInnerHTML={{ __html: detail.description }} />;
  }
};
