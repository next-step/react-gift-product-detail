import { useReactQueryFetch } from '@/hooks/useReactQueryFetch';
import { fetchProductDetailHTML, fetchHighlightReview } from '@/api/products';
import ProductTabs from './ProductTabs';
import styled from '@emotion/styled';

const ProductContent = ({
  id,
  activeTab,
  setActiveTab,
}: {
  id: number;
  activeTab: number;
  setActiveTab: (index: number) => void;
}) => {
  const { data: detailRes } = useReactQueryFetch(['productDetail', id], () =>
    fetchProductDetailHTML(id)
  );

  const { data: reviewRes } = useReactQueryFetch(['highlightReview', id], () =>
    fetchHighlightReview(id)
  );

  return (
    <Container>
      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        detailHTML={detailRes?.description}
        highlightReviews={reviewRes?.reviews ?? []}
        announcements={detailRes?.announcements ?? []}
      />
    </Container>
  );
};

export default ProductContent;

const Container = styled.div`
  padding-bottom: 72px;
`;
