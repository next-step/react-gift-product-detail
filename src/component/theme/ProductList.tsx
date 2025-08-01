import {
} from '@/component/main/GiftRanking.styled';
import { CentorAlignDiv240,} from '@/styles/CommomStyle/Common.styled';
import {  ProductGrid } from '@/styles/CommomStyle/ProductList';
import Loading from '../Loading';
import useProductList from '@/hook/useProductList';
import ProductCard from '../ProductCard';


const ProductList = () => {
  const {isLoading, error, productList,extraLoading,setLoaderRef} = useProductList();

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
          <ProductCard key={product.id} {...product}/>
        ))}
      </ProductGrid>
      <Loading loading={extraLoading}/>
      <div ref={setLoaderRef} style={{ height: '10px' }} />
    </>
  );
};


export default ProductList;