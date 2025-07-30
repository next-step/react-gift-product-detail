import PresentRankingItem from '@src/components/Home/PresentRanking/Item/PresentRankingItem';
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
import { useRankingItem } from '@src/components/Home/PresentRanking/Cotainer/useRankingItem';

const PresentRankingContainer = () => {
  const [isVisible, setisVisible] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const rankType = params.get(PARAMS.rankType);
  const targetType = params.get(PARAMS.targetType);
  const { data, isLoading, isError } = useRankingItem({ targetType, rankType });

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
        <PresentRankingItem
          goods={data}
          isLoading={isLoading}
          isError={isError}
          isVisible={isVisible}
          showRankingNumber={true}
        ></PresentRankingItem>
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
