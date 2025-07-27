import React from 'react';
import type { Product } from '../../types';
import * as S from './styles';

interface ProductHeaderProps {
  product: Product;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  return (
    <S.Container>
      <S.Image src={product.imageURL} alt={product.name} />
      <S.ProductInfo>
        <S.ProductName>{product.name}</S.ProductName>
        <S.ProductPrice>
          {product.price?.sellingPrice.toLocaleString()}원
        </S.ProductPrice>
        <S.Line />
        <S.ProductBrandInfo>
          <S.ProductBrandImage src={product.brandInfo.imageURL} />
          <S.ProductBrand>{product.brandInfo.name}</S.ProductBrand>
        </S.ProductBrandInfo>
      </S.ProductInfo>
    </S.Container>
  );
};

export default ProductHeader;
