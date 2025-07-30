import styled from '@emotion/styled';
import { requests } from '@/api/requests';
import { useQuery } from '@tanstack/react-query';
import ProductReviewSection from './components/ProductReviewSection';
import { useParamsIndex } from '@/hooks/useParamsIndex';

const ProductPage = () => {
  const index = useParamsIndex();

  const productQuery = useQuery({
    queryKey: ['productData'],
    queryFn: () => requests.fetchProduct(index),
  });

  const productDetailQuery = useQuery({
    queryKey: ['productDetailData'],
    queryFn: () => requests.fetchProductDetail(index),
  });

  const productWishQuery = useQuery({
    queryKey: ['productWishData'],
    queryFn: () => requests.fetchProductWish(index),
  });
  if (!index) return;

  return (
    <main>
      <section>
        <img src={productQuery.data?.imageURL} alt={productQuery.data?.name} />
        <h3>{productQuery.data?.name}</h3>
        <p>{productQuery.data?.price.basicPrice} 원</p>
        <div>
          <img
            src={productQuery.data?.brandInfo.imageURL}
            alt={productQuery.data?.brandInfo.name}
          />
          <p>{productQuery.data?.brandInfo.name}</p>
        </div>
      </section>
      <section>
        <div>
          <div>
            <button>
              <p>상품설명</p>
            </button>
            <button>
              <p>선물후기</p>
            </button>
            <button>
              <p>상세정보</p>
            </button>
          </div>

          <ProductReviewSection index={index} />
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
