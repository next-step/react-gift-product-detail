import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductRankings } from '@/api/productRankingApi';
import type { ProductRanking,GiftGridProps } from '@/types/giftRankingTheme';
import { FadeLoader } from 'react-spinners';
import GiftItem from '@/components/gift-ranking/GiftItem';
import { GridWrapper, MoreButton, ButtonWrapper,LoadingWrapper ,EmptyMessage} from '@/components/gift-ranking/Grid.style';
import { useAuth } from '@/context/AuthContext';


const GiftGrid = ({ gender, category }: GiftGridProps) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const {
    data: productRankings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['productRanking', gender, category],
    queryFn: () =>
      fetchProductRankings(category.toUpperCase(), gender.toUpperCase()).then(
        (res) => res.data.data
      ),
  });
  

const handleCount = () => {
    setVisibleCount((prev) =>
      productRankings && visibleCount >= productRankings.length ? 6 : prev + 6
    );
  };

  if (isLoading) {
    return (
      <LoadingWrapper>
        <FadeLoader color="#033128" height={15} width={5} />
      </LoadingWrapper>
    );
  }

  if (isError) {
    return <EmptyMessage>상품을 불러오는 데 실패했습니다.</EmptyMessage>;
  }

  if (!productRankings || productRankings.length === 0) {
    return <EmptyMessage>상품이 없습니다.</EmptyMessage>;
  }

  const visibleGifts = productRankings.slice(0, visibleCount);


  return (
    <>
      <GridWrapper>
        {visibleGifts.map((gift:ProductRanking, index:number) => (
          <GiftItem
            key={gift.id}
            id={gift.id}
            name={gift.name}
            imageURL={gift.imageURL}
            brand={gift.brandInfo.name}
            price={gift.price.sellingPrice}
            discountRate={gift.price.discountRate}
            rank={index + 1}
            onClick={() => {
              if (!isLoggedIn) {
                alert('로그인이 필요합니다.');
                navigate('/login');
                return;
              }
              navigate('/order', { state: { id: gift.id } });
            }}
          />
        ))}
      </GridWrapper>
      <ButtonWrapper>
        <MoreButton onClick={handleCount}>
          {visibleCount >= productRankings.length ? '접기' : '더보기'}
        </MoreButton>
      </ButtonWrapper>
    </>
  );
};

export default GiftGrid;
