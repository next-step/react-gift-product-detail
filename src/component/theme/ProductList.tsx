import {
} from '@/component/main/GiftRanking.styled';
import { CentorAlignDiv240,} from '@/styles/CommomStyle/Common.styled';
import { BrandImage, Price, ProductCard, ProductGrid, ProductImage, ProductInfo } from '@/styles/CommomStyle/ProductList';
import Loading from '../Loading';
import useProductList from '@/hook/useProductList';
import type { ProductItem } from '@/type/GiftAPI/product';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ProductList = () => {
  const {isLoading, error, productList,extraLoading,setLoaderRef} = useProductList();
  const { user } = useAuth();
  const navigate = useNavigate();

   const handleClickProduct = (product: ProductItem) => {
    if (!user) {
      navigate(`/login?redirect=/order?id=${product.id}`);
    } else {
      navigate(`/order?id=${product.id}`);
    }
  };

  if (error) return null

  if (isLoading) return (
    <Loading/>
  );
  
  if (!isLoading && productList.length === 0) return (
    <CentorAlignDiv240>
      <p>상품이 없습니다</p>
    </CentorAlignDiv240>
  );

  return (
    <>
      <ProductGrid>
        {productList.map(product => (
          <ProductCard key={product.id} onClick={() => handleClickProduct(product)}>
            <ProductImage src={product.imageURL} alt={product.name} />
            <BrandImage src={product.brandInfo.imageURL} alt={product.brandInfo.name} />
            <ProductInfo title={product.name}>{product.name}</ProductInfo>
            <Price>{product.price.sellingPrice.toLocaleString()} 원</Price>
          </ProductCard>
        ))}
      </ProductGrid>
      <Loading loading={extraLoading}/>
      <div ref={setLoaderRef} style={{ height: '10px' }} />
    </>
  );
};


export default ProductList;