import getProductInfo from "@/apis/products/getProductInfo";
import Divider from "@/components/common/Divider";
import { QUERY_KEYS } from "@/constants/queryKeys";
import styled from "@emotion/styled";
import { useSuspenseQuery } from "@tanstack/react-query";

interface ProductInfoProps {
  productId: string;
}

const ProductInfo = ({ productId }: ProductInfoProps) => {
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEYS.PRODUCT(productId),
    queryFn: () => getProductInfo({ productId }),
  });

  return (
    <Container>
      <ProductImg src={data.imageURL} alt={data.name} />
      <InfoWrapper>
        <ProductName>{data.name}</ProductName>
        <ProductPrice>
          {data.price.sellingPrice}
          <Span>원</Span>
        </ProductPrice>
      </InfoWrapper>
      <Divider spacing="2px" fill={false} />
      <BrandWrapper>
        <BrandImg src={data.brandInfo.imageURL} />
        <BrandName>{data.brandInfo.name}</BrandName>
      </BrandWrapper>
    </Container>
  );
};

export default ProductInfo;

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
`;
const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;
const InfoWrapper = styled.div`
  width: 100%;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing2};
`;
const ProductName = styled.h3`
  font: ${({ theme }) => theme.typography.title1Bold};
  text-align: left;
`;
const ProductPrice = styled.p`
  font: ${({ theme }) => theme.typography.title1Bold};
  text-align: left;
`;
const Span = styled.span`
  font-weight: 400;
`;
const BrandWrapper = styled(InfoWrapper)`
  flex-direction: row;
`;
const BrandImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;
const BrandName = styled.p`
  font: ${({ theme }) => theme.typography.subtitle1Regular};
  display: flex;
  align-items: center;
`;
