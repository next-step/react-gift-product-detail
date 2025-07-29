import styled from "@emotion/styled";

type ProductsInfoSectionProps = {
  name: string | undefined;
  imageURL: string | undefined;
  price: number | undefined;
  brandName: string | undefined;
  brandImageURL: string | undefined;
};

const ProductsInfoSection = ({
  name,
  imageURL,
  price,
  brandName,
  brandImageURL,
}: ProductsInfoSectionProps) => {
  return (
    <Section>
      <Img src={imageURL} alt={name} />
      <Info>
        <Name>{name}</Name>
        <Price>
          {price}
          <Span>원</Span>
        </Price>
      </Info>
      <VerticalLine />
      <Brand>
        <BrandImg src={brandImageURL} alt={brandName} />
        <BrandName>{brandName}</BrandName>
      </Brand>
    </Section>
  );
};

export default ProductsInfoSection;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.gray.gray00};
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

const Info = styled.div`
  margin: ${({ theme }) =>
    `${theme.spacing.spacing5} 0 ${theme.spacing.spacing4}`};
  padding: ${({ theme }) => `0 ${theme.spacing.spacing4}`};
`;

const Name = styled.h3`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
`;

const Span = styled.span`
  font-weight: ${({ theme }) => theme.typography.title1Regular.fontWeight};
`;

const VerticalLine = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray.gray300};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => `0 ${theme.spacing.spacing4}`};
  margin: ${({ theme }) => `${theme.spacing.spacing4} 0`};
  gap: ${({ theme }) => theme.spacing.spacing2};
`;

const BrandName = styled.span`
  font-size: ${({ theme }) => theme.typography.title2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.title2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.title2Regular.lineHeight};
`;

const BrandImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;
