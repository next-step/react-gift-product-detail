import { useProductDetail } from '@/queries/useProductDetail';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const Container = styled.div`
  white-space: pre-wrap;
  max-width: 100%;
  width: 100%;
  overflow-y: hidden;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
`;

const ImageHolder = styled.p`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
`;

interface ProductExplainProps {
  productId: number;
}

const getFirstImgSrc = (html: string | undefined) => {
  if (!html) return '';
  const match = html.match(/<img [^>]*src=["']([^"']+)["']/i);
  return match ? match[1] : '';
};

const ProductExplain = ({ productId }: ProductExplainProps) => {
  const { data, isLoading } = useProductDetail(productId);
  if (isLoading || !data)
    return (
      <ImageHolder>
        <Image alt="상품 설명 로딩" />
      </ImageHolder>
    );

  const imgSrc = getFirstImgSrc(data.description);
  const hasImg = imgSrc !== '';
  return (
    <>
      <Wrapper>
        <Container>
          {hasImg && (
            <ImageHolder>
              <Image src={imgSrc} alt="상품 설명 이미지" />
            </ImageHolder>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default ProductExplain;
