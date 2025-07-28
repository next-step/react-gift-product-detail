import styled from '@emotion/styled';

interface Props {
  imageURL: string;
  name: string;
  price: number;
  brand: {
    name: string;
    imageURL: string;
  };
}

const ProductHeader = ({ imageURL, name, price, brand }: Props) => {
  return (
    <>
      <Image src={imageURL} alt={name} />
      <Content>
        <Title>{name}</Title>
        <Price>{price.toLocaleString()}원</Price>
        <Brand>
          <BrandLogo src={brand.imageURL} alt={brand.name} />
          <BrandName>{brand.name}</BrandName>
        </Brand>
      </Content>
    </>
  );
};

export default ProductHeader;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  margin: 0 ${({ theme }) => theme.spacing[2]};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.title.title1Bold};
`;

const Price = styled.p`
  ${({ theme }) => theme.typography.title.title2Bold};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} 0`};
  border-top: 1px solid ${({ theme }) => theme.color.gray[100]};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray[100]};
`;

const BrandLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const BrandName = styled.p`
  ${({ theme }) => theme.typography.label.label2Regular};
`;
