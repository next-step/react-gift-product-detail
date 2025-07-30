import React from 'react';
import {
  ProductInfo,
  ProductName,
  ProductPrice,
  BrandInfo,
  BrandLogo,
  BrandName,
} from './ProductDetail.styles';

interface ProductBasicInfoSectionProps {
  name: string;
  sellingPrice: number;
  brandImageURL: string;
  brandName: string;
}

const ProductBasicInfoSection: React.FC<ProductBasicInfoSectionProps> = ({
  name,
  sellingPrice,
  brandImageURL,
  brandName,
}) => {
  return (
    <ProductInfo>
      <ProductName>{name}</ProductName>
      <ProductPrice>{sellingPrice.toLocaleString()}원</ProductPrice>
      <BrandInfo>
        <BrandLogo src={brandImageURL} alt={brandName} />
        <BrandName>{brandName}</BrandName>
      </BrandInfo>
    </ProductInfo>
  );
};

export default ProductBasicInfoSection;
