import { useQueryProductsDetail } from '@/apis/hooks/useReadProductsDetail';
import { Tabs } from '@/components/common/Tabs';
import styled from '@emotion/styled';
import { useSuspenseQueries } from '@tanstack/react-query';
import { ProductDetailDescription } from './ProductDetailDescription';
import { ProductDetailAnnouncements } from './ProductDetailAnnouncements';
import { useQueryProductsHighlightReview } from '@/apis/hooks/useReadProductsHighlightReview';
import { ProductDetailReview } from './ProductDetailReview';

type Props = {
  productId: string;
};

export const ProductDetailSection = ({ productId }: Props) => {
  const [{ data: productDetailData }, { data: productHighlightReviewData }] = useSuspenseQueries({
    queries: [
      useQueryProductsDetail({ productId }),
      useQueryProductsHighlightReview({ productId }),
    ],
  });

  const productDetail = productDetailData.data.data;
  const { description, announcements } = productDetail;

  const productHighlightReview = productHighlightReviewData.data.data;
  const { reviews } = productHighlightReview;

  return (
    <Wrapper>
      <Tabs.Root defaultValue='description'>
        <Tabs.List>
          <Tabs.Trigger value='description'>상품설명</Tabs.Trigger>
          <Tabs.Trigger value='reviews'>선물후기</Tabs.Trigger>
          <Tabs.Trigger value='info'>상세정보</Tabs.Trigger>
        </Tabs.List>

        <ContentWrapper>
          <Tabs.Content value='description'>
            <ProductDetailDescription description={description} />
          </Tabs.Content>
          <Tabs.Content value='reviews'>
            <ProductDetailReview reviews={reviews} />
          </Tabs.Content>
          <Tabs.Content value='info'>
            <ProductDetailAnnouncements announcements={announcements} />
          </Tabs.Content>
        </ContentWrapper>
      </Tabs.Root>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const ContentWrapper = styled.div`
  min-height: 400px;
`;
