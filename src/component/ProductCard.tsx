import { useAuth } from '@/context/AuthContext';
import { BrandImage, Price, ProductCardSection, ProductImage, ProductInfo } from '@/styles/CommomStyle/ProductList';
import type { ProductItem } from "@/type/GiftAPI/product"
import { useNavigate } from 'react-router-dom';

const ProductCard = (product: ProductItem) => {

  const navigate = useNavigate();
  const { user } = useAuth();
  const handleClickProduct = (product: ProductItem) => {
    
    if (!user) {
      navigate(`/login?redirect=/order?id=${product.id}`);
    } else {
      navigate(`/Product/${product.id}`)
      //navigate(`/order/${product.id}`);
    }
  };

  return (
    <ProductCardSection
      onClick={() => handleClickProduct(product)}
    >
      <ProductImage src={product.imageURL} alt={product.name} />
      <BrandImage
        src={product.brandInfo.imageURL}
        alt={product.brandInfo.name}
      />
      <ProductInfo title={product.name}>{product.name}</ProductInfo>
      <Price>{product.price.sellingPrice.toLocaleString()} 원</Price>
    </ProductCardSection>
  )
}

export default ProductCard