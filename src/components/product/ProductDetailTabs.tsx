import { useState } from 'react';
import { css } from '@emotion/react';
import { palette, spacing, typography } from '@/styles/theme';
import type { ProductDetail, ProductReview } from '@/types';
import styled from '@emotion/styled';
import { TabContent } from './TabContent';

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
        <TabContent activeTab={activeTab} detail={detail} reviews={reviews} />
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
