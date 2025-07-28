/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import type { ProductDetail } from "@/types/api_types";

interface ProductDetailSectionProps {
  productDetail: ProductDetail;
}

const ProductExplanationSection = ({
  productDetail,
}: ProductDetailSectionProps) => {
  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: productDetail.description }} />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  padding: 10px;

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;

export default ProductExplanationSection;
