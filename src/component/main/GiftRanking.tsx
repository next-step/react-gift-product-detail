import { Suspense, useState } from 'react';
import {
  CategoryGroup,
  GiftRanKingSection,
  IconWrapper,
  Label,
  PeopleFilterButton,
  PeopleGroup,
  WishFilterButton,
  WishGroup,
} from './GiftRanking.styled';

import GiftRankingList from './GiftRankingList';
import { RankFilterOption, RankType, TargetFilterOption, TargetType } from '@/type/giftRanking';
import { Gap, Title } from '@/styles/CommomStyle/Common.styled';
import { ProductDiv } from '@/styles/CommomStyle/ProductList';
import Loading from '../Loading';
import { ErrorBoundary } from 'react-error-boundary';


const GiftRanking = () => {

  const [targetType, settargetType] = useState<TargetType>(TargetType.ALL);
  const [rankType, setrankType] = useState<RankType>(RankType.MANY_WISH);

  const handlePeopleClick = (type: TargetType) => {
    settargetType(type);
  };

  const handleWishClick = (type: RankType) => {
    setrankType(type);
  };

  return (
    <GiftRanKingSection>
      <Title> 실시간 급상승 선물랭킹 </Title>
      <Gap height={20} />
      <CategoryGroup>
        <PeopleGroup>

          {TargetFilterOption.map(({ type, icon, label }) => (
            <PeopleFilterButton
              key={type}
              active={targetType === type}
              onClick={() => handlePeopleClick(type)}
            >
              <IconWrapper>{icon}</IconWrapper>
              <Label>{label}</Label>
            </PeopleFilterButton>
          ))}
        </PeopleGroup>

        <Gap height={16}  />
        <WishGroup>
          {RankFilterOption.map(({ type, text }) => (
            <WishFilterButton
              key={type}
              active={rankType === type}
              onClick={() => handleWishClick(type)}
            >
              {text}
            </WishFilterButton>
          ))}


        </WishGroup>
      </CategoryGroup>
      <Gap height={16} />
      <ProductDiv>
        <ErrorBoundary fallback={null}>
          <Suspense fallback={<Loading />}>
            <GiftRankingList targetType={targetType} rankType={rankType} />
          </Suspense>
        </ErrorBoundary>

      </ProductDiv>
    </GiftRanKingSection>
  );
};

export default GiftRanking;
