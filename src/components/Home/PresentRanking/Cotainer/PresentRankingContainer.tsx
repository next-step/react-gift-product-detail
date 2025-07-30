import PresentRankingItem from '@src/components/Home/PresentRanking/Item/PresentRankingItem';
import RankingTagContainer from '@src/components/Home/PresentRanking/Cotainer/RankingTagContainer';
import { Suspense, useState } from 'react';
import {
  StyledPresenetRankingAddItemBtn,
  StyledPresenetRankingAddItemBtnDiv,
  StyledPresentRankingContainer,
  StyledPresentRankingContainerTitle,
  StyledPrsentRankingDiv,
} from '@src/components/Home/PresentRanking/Cotainer/StyledPresentRankingContainer';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import { PARAMS } from '@src/assets/params';
import { useRankingItem } from '../Item/useRankingItem';

const PresentRankingContainer = () => {
  const [isVisible, setisVisible] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const rankType = params.get(PARAMS.rankType);
  const targetType = params.get(PARAMS.targetType);
  const { data } = useRankingItem({ targetType, rankType });

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
        <ErrorBoundary fallback={<div>에러 발생!</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <PresentRankingItem
              data={data}
              isVisible={isVisible}
              showRankingNumber={true}
            ></PresentRankingItem>
          </Suspense>
        </ErrorBoundary>
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
