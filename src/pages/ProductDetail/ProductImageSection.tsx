import React from 'react';
import { ProductImage } from './ProductDetail.styles';

interface ProductImageSectionProps {
  imageURL: string;
  altText: string;
}

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  imageURL,
  altText,
}) => {
  return <ProductImage src={imageURL} alt={altText} />;
};

export default ProductImageSection;
