import {
} from '@/component/main/GiftRanking.styled';
import { CentorAlignDiv240,} from '@/styles/CommomStyle/Common.styled';
import { BrandImage, Price, ProductCard, ProductGrid, ProductImage, ProductInfo } from '@/styles/CommomStyle/ProductList';
import Loading from '../Loading';
import useProductList from '@/hook/useProductList';


const ProductList = () => {
   const {data, isLoading, error, productList,extraLoading,handleClickProduct,setLoaderRef} = useProductList();

  if (error) return null

  if (isLoading) return (
    <Loading/>
  );
  
  if (!isLoading && productList.length === 0 && data?.list?.length === 0) return (
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