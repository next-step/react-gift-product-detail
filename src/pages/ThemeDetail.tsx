import { useParams, useNavigate } from 'react-router-dom';
import { getThemeInfo } from '@/apis/theme';
import { useEffect } from 'react';
import type { ThemeInfoResponseDTO } from '@/types/DTO/themeDTO';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import {
  ThemeContainerWrapper,
  ThemeInfoContainer,
  ProductList,
  ProductCard,
  ProductImg,
  ProductName,
  ProductBrand,
  ProductPrice,
} from '@/styles/Theme/ThemeDetail.styled';
import { useQuery } from '@tanstack/react-query';
import useProductDetail from '@/hooks/useProductDetail';

function ThemeDetail() {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const { handleItemClick } = useProductDetail();

  const { products, loading, lastProductRef } = useIntersectionObserver(Number(themeId));

  const {
    data: themeInfo,
    isLoading,
    isError,
  } = useQuery<ThemeInfoResponseDTO>({
    queryKey: ['themeInfo', themeId],
    queryFn: () => getThemeInfo(Number(themeId)),
  });

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <ThemeContainerWrapper>
      {themeInfo ? (
        <ThemeInfoContainer backgroundColor={themeInfo.backgroundColor}>
          <p>{themeInfo.name}</p>
          <p>{themeInfo.title}</p>
          <p>{themeInfo.description}</p>
        </ThemeInfoContainer>
      ) : (
        <p>로딩중...</p>
      )}

      <ProductList>
        {products.length === 0 && !loading && <div>상품이 없습니다.</div>}
        {products.map((item, idx) => (
          <ProductCard onClick={() => handleItemClick(item.id)} key={`${item.id}-${idx}`}>
            <ProductImg src={item.imageURL} alt={item.name} />
            <ProductName>{item.name}</ProductName>
            <ProductBrand>{item.brandInfo.name}</ProductBrand>
            <ProductPrice>{item.price.basicPrice}원</ProductPrice>
          </ProductCard>
        ))}
        <div ref={lastProductRef} />
      </ProductList>
      {loading && <div style={{ textAlign: 'center', padding: '16px' }}>로딩중...</div>}
    </ThemeContainerWrapper>
  );
}

export default ThemeDetail;
