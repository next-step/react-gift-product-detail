import styled from "@emotion/styled";
import GiftTargetType from "./GiftTargetType";
import { targetType, rankType } from "@/data/giftType";
import GiftsRender from "./GiftsRender";
import useGiftRankingFilter from "@/hooks/useGiftRankingFilter";

const GiftsRanking = () => {
  const { selectedTargetType, selectedRankType, changeFilter } =
    useGiftRankingFilter();

  return (
    <Background>
      <RankingTitle>실시간 급상승 선물랭킹</RankingTitle>
      <GiftTargetTypeFlex>
        {targetType.map((type, index) => (
          <GiftTargetType
            key={index}
            icon={type.icon}
            name={type.name}
            selected={selectedTargetType === type.id}
            onClick={() => changeFilter("targetType", type.id)}
          />
        ))}
      </GiftTargetTypeFlex>
      <GiftRankTypeFlex>
        {rankType.map((type, index) => (
          <GiftRankType
            key={index}
            selected={selectedRankType === type.id}
            onClick={() => changeFilter("rankType", type.id)}
          >
            {type.name}
          </GiftRankType>
        ))}
      </GiftRankTypeFlex>
      <GiftsRender
        targetType={selectedTargetType}
        rankType={selectedRankType}
      />
    </Background>
  );
};

export default GiftsRanking;

const Background = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.spacing4};
  background-color: ${({ theme }) => theme.colors.semantic.background.default};
`;

const RankingTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.title1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0;
  padding: ${({ theme }) =>
    `${theme.spacing.spacing5} ${theme.spacing.spacing2}`};
`;

const GiftTargetTypeFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing2};
  padding: ${({ theme }) => `${theme.spacing.spacing4} 0`};
`;

const GiftRankTypeFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue.blue100};
  padding: ${({ theme }) =>
    `${theme.spacing.spacing3} ${theme.spacing.spacing4}`};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.blue.blue300};
`;

const GiftRankType = styled.p<{ selected: boolean }>`
  width: 100%;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme, selected }) =>
    selected
      ? theme.typography.body2Bold.fontWeight
      : theme.typography.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.blue.blue700 : theme.colors.blue.blue500};
  margin: ${({ theme }) => theme.spacing.spacing0};
  transition:
    color 200ms,
    font-weight 200ms;
  cursor: pointer;
`;
