// PresentProductList.tsx
import { URLS } from '@src/assets/urls';
import {
  StyledPresentRankingItemBrandName,
  StyledPresentRankingItemDiv,
  StyledPresentRankingItemImage,
  StyledPresentRankingItemPrasentPrice,
  StyledPresentRankingItemPresentItem,
  StyledPresentRankingNumContainer,
} from '@src/components/Home/PresentRanking/Item/StyledPresentRankingItem';
import type { Good, Goods } from '@src/types/Goods';
import { useNavigate } from 'react-router-dom';
interface Props {
  data: Goods;
  isVisible?: boolean;
  showRankingNumber?: boolean;
}
const BASIC_RANKING_COMPONENT_NUMBER = 6;
const MANY_RANKING_COMPONENT_NUMBER = 18;

const PresentProductList = ({ data, isVisible = false, showRankingNumber = false }: Props) => {
  const navigate = useNavigate();
  const repeatCnt = isVisible ? MANY_RANKING_COMPONENT_NUMBER : BASIC_RANKING_COMPONENT_NUMBER;

  const handleItemClick = (item: Good) => {
    if (!sessionStorage.getItem('email')) {
      sessionStorage.setItem('redirectProductId', String(item.id));
      navigate(URLS.login);
    } else {
      navigate(`${URLS.order}/${item.id}`);
    }
  };
  return (
    <>
      {data?.data.slice(0, repeatCnt).map((item: Good, index: number) => (
        <div key={item.id} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
          <StyledPresentRankingItemDiv>
            {showRankingNumber && (
              <StyledPresentRankingNumContainer index={index + 1}>
                {index + 1}
              </StyledPresentRankingNumContainer>
            )}
            <StyledPresentRankingItemImage src={item.imageURL} alt={item.name} />
            <StyledPresentRankingItemBrandName className='brand_name'>
              {item.brandInfo.name}
            </StyledPresentRankingItemBrandName>
            <StyledPresentRankingItemPresentItem className='goods_name'>
              {item.name}
            </StyledPresentRankingItemPresentItem>
            <StyledPresentRankingItemPrasentPrice className='goods_price'>
              {item.price.sellingPrice.toLocaleString()} 원
            </StyledPresentRankingItemPrasentPrice>
          </StyledPresentRankingItemDiv>
        </div>
      ))}
    </>
  );
};

export default PresentProductList;
