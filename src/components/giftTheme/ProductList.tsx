/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import type { Product } from '../../types/GiftTheme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProductListProps {
  products: Product[];
}

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
`;

const ProductCard = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
`;

const BrandName = styled.p`
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.gray600};
`;

const ProductName = styled.h6`
  ${({ theme }) => theme.typography.label1Regular};
  color: ${({ theme }) => theme.colors.gray900};
`;

const ProductPrice = styled.div`
  ${({ theme }) => theme.typography.title2Bold};
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.gray900};
`;

export const ProductList = ({ products }: ProductListProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    if (isAuthenticated) {
      navigate(`/products/${id}`);
    } else {
      navigate('/login', {
        state: { redirectTo: `/products/${id}` },
      });
    }
  };

  if (products.length === 0) {
    return <p>상품이 없습니다.</p>;
  }

  return (
    <ProductGrid>
      {products.map(product => (
        <ProductCard
          key={product.id}
          onClick={() => handleClick(product.id)}
        >
          <ProductImage src={product.imageURL} alt={product.name} />
          <BrandName>{product.brandInfo.name}</BrandName>
          <ProductName>{product.name}</ProductName>
          <ProductPrice>
            {product.price.sellingPrice.toLocaleString()}원
          </ProductPrice>
        </ProductCard>
      ))}
    </ProductGrid>
  );
};
