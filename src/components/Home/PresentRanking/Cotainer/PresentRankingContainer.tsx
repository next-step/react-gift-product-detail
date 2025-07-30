import RankingTagContainer from '@src/components/Home/PresentRanking/Cotainer/RankingTagContainer';
import { useState } from 'react';
import {
  StyledPresenetRankingAddItemBtn,
  StyledPresenetRankingAddItemBtnDiv,
  StyledPresentRankingContainer,
  StyledPresentRankingContainerTitle,
  StyledPrsentRankingDiv,
} from '@src/components/Home/PresentRanking/Cotainer/StyledPresentRankingContainer';
import { useLocation } from 'react-router-dom';
import { PARAMS } from '@src/assets/params';
import { useRankingItem } from '../Item/useRankingItem';
import PresentProductList from '../Item/PresentProductList';

const PresentRankingContainer = () => {
  const [isVisible, setisVisible] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const rankType = params.get(PARAMS.rankType);
  const targetType = params.get(PARAMS.targetType);
  const { data, isError, isLoading } = useRankingItem({ targetType, rankType });

  const handelToogle = () => {
    setisVisible((prev) => !prev);
  };

  return (
    <StyledPresentRankingContainer>
      <StyledPresentRankingContainerTitle>
        실시간 급상승 선물랭킹
      </StyledPresentRankingContainerTitle>
      <div>
        <RankingTagContainer></RankingTagContainer>
      </div>
      <StyledPrsentRankingDiv>
        <PresentProductList
          data={data}
          isError={isError}
          isLoading={isLoading}
          isVisible={isVisible}
          showRankingNumber={true}
        ></PresentProductList>
      </StyledPrsentRankingDiv>
      <StyledPresenetRankingAddItemBtnDiv>
        <StyledPresenetRankingAddItemBtn onClick={handelToogle}>
          {isVisible ? '닫기' : '더보기'}
        </StyledPresenetRankingAddItemBtn>
      </StyledPresenetRankingAddItemBtnDiv>
    </StyledPresentRankingContainer>
  );
};

export default PresentRankingContainer;
